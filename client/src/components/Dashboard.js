import React from "react";
import { Jumbotron, Container } from "reactstrap";
import styled from "styled-components";
import CanvasJSReact from "../canvasjs.react";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DashTron = styled(Jumbotron)`

`;

const DashboardWrapper = styled.div`
  padding-top: 200px;
`;

function Dashboard() {

  const graphOptions = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Test Graph"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: [
        { y: 18, label: "Spagett" },
        { y: 49, label: "Spooked Ya" },
        { y: 9, label: "Cigarette Juice" },
        { y: 24, label: "Spooked Ya Again" }
      ]
    }]
  };

  return (
    <React.Fragment>
      <DashboardWrapper>
        <Container>
          <h1>Dashboard</h1>
        </Container>
        <DashTron>
          <Container>
            <CanvasJSChart options={graphOptions} />
            Pipeline report (%, # in each stage)<br />
            Progress line chart(apps per day)
          </Container>
        </DashTron>
        <Container>
          <h3>Search Bar(redirect to search?)</h3>
          <h3>Recent Applications</h3>
          <h3>Upcoming FOllow Ups</h3>
          <h3>Upcoming Interviews</h3>
        </Container>
      </DashboardWrapper>
    </React.Fragment>
  );
}

export default Dashboard;