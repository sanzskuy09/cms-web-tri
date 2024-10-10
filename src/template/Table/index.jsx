import { Space, Table } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const { Column } = Table;
export default function TableView() {
  const dataSource = [
    {
      id: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      id: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const exportPDF = async () => {
    const header = ["ID", "Name", "Age", "Address"];
    const doc = new jsPDF({ orientation: "landscape" });

    const arrayData = dataSource.map((row) => Object.values(row));

    autoTable(doc, {
      head: [header],
      body: arrayData,
    });

    // doc.table(1, 1, dataTable, header, { autoSize: true });
    doc.save("table.pdf");
  };

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />

      <div>
        <Table dataSource={dataSource} id="my-table">
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />

          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
              </Space>
            )}
          />
        </Table>
      </div>

      <button onClick={exportPDF}>Print PDF</button>
    </div>
  );
}
