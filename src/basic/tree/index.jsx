import React from "react"
import { Tree } from "antd"

const TreeNode = Tree.TreeNode
const topLevel = [ "0", "-1", 0, -1, "" ]

export default class JRTree extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            treeList: [],
            expandedKeys: []
        }
    }
    componentDidMount() {
        let { data, defaultExpandAll } = this.props
        this.getTreeList(data, defaultExpandAll)
    }
    componentWillReceiveProps(nextProps) {
        let { data, defaultExpandAll } = nextProps
        this.getTreeList(data, defaultExpandAll)
    }

    getTreeList(data, defaultExpandAll) {
        let treeList = []
        let expandedKeys = this.state.expandedKeys
        if (data && Object.keys(data).length) {
            treeList = this.getChildList(data)
            if (defaultExpandAll) expandedKeys = data.map((b) => b.id)
        }
        this.setState({
            treeList,
            expandedKeys
        })
    }
    getChildList(data) {
        let parent = []
        let { rootPId = "" } = this.props
        data.map((item) => {
            if (topLevel.includes(item.pId) || rootPId === item.pId) {
                let children = this.searchChilds(item, data)
                Object.assign(item, { children: children })
                parent.push(item)
            }
        })
        return parent
    }

    searchChilds(p, data) {
        let childs = []
        data.map((item) => {
            if (p.id === item.pId) {
                if (item.children == null) {
                    Object.assign(item, { children: this.searchChilds(item, data) })
                }
                childs.push(item)
            }
        })
        return childs
    }

    handleExpandChange(expandedKeys) {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        })
    }

    renderTreeNodes(data) {
        let { rootPId = "", judge = "" } = this.props;
        return data.map((item) => {
            const title = <span>{item.name}</span>
            if (item.children && item.children.length) {
                return (
                    <TreeNode
                        key={item.id}
                        title={title}
                        refData={item}
                        disabled={judge=="targetScore"?(item.hasOwnProperty("flag") && item.flag ? false :true): false}
                        isLeaf={false}
                    >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return (
                <TreeNode
                    key={item.id}
                    title={title}
                    refData={item}
                    disabled={judge=="targetScore"?(item.hasOwnProperty("flag") && item.flag ? false :true): false}
                    isLeaf={true}
                />
            )
        })
    }

    render() {
        let { expandedKeys, treeList } = this.state
        return (
            <Tree
                className="jupiter-tree"
                {...this.props}
                showLine
                onExpand={this.handleExpandChange.bind(this)} //展开/收起节点时触发
                expandedKeys={expandedKeys}
            >
                {this.renderTreeNodes(treeList)}
            </Tree>
        )
    }
}
