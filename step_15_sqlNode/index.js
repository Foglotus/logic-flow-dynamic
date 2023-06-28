import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import "./style.css";
import sqlNode from "./sqlNode";
import sqlEdge from "./sqlEdge";

const lf = new LogicFlow({
  container: document.querySelector("#app"),
  grid: true
});

lf.register(sqlNode);
lf.register(sqlEdge);
lf.setDefaultEdgeType("sql-edge");
lf.setTheme({
  bezier: {
    stroke: "#afafaf",
    strokeWidth: 1
  }
});
lf.render({
  nodes: [
    {
      id: "node_id_1",
      type: "sql-node",
      x: 100,
      y: 100,
      properties: {
        tableName: "Users",
        fields: [
          {
            key: "id",
            type: "string"
          },
          {
            key: "name",
            type: "string"
          },
          {
            key: "age",
            type: "integer"
          }
        ]
      }
    },
    {
      id: "node_id_2",
      type: "sql-node",
      x: 400,
      y: 200,
      properties: {
        tableName: "Settings",
        fields: [
          {
            key: "id",
            type: "string"
          },
          {
            key: "key",
            type: "integer"
          },
          {
            key: "value",
            type: "string"
          }
        ]
      }
    }
  ],
  edges: []
});

// 1.1.28新增，可以自定义锚点显示时机了
lf.on("anchor:dragstart", ({ data, nodeModel }) => {
  if (nodeModel.type === "sql-node") {
    lf.graphModel.nodes.forEach((node) => {
      if (node.type === "sql-node" && nodeModel.id !== node.id) {
        node.isShowAnchor = true;
        node.setProperties({
          isConnection: true
        });
      }
    });
  }
});
lf.on("anchor:dragend", ({ data, nodeModel }) => {
  if (nodeModel.type === "sql-node") {
    lf.graphModel.nodes.forEach((node) => {
      if (node.type === "sql-node" && nodeModel.id !== node.id) {
        node.isShowAnchor = false;
        lf.deleteProperty(node.id, "isConnection");
      }
    });
  }
});

document.querySelector("#js_add-field").addEventListener("click", () => {
  lf.getNodeModelById("node_id_1").addField({
    key: Math.random().toString(36).substring(2, 7),
    type: ["integer", "long", "string", "boolean"][
      Math.floor(Math.random() * 4)
    ]
  });
});

document.querySelector("#js_save").addEventListener("click", () => {
  const data = lf.getGraphData();
  console.log(data);
});
