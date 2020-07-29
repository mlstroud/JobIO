import React from "react";
import { Jumbotron, Container } from "reactstrap";
import styled from "styled-components";
import CanvasJSReact from "../canvasjs.react";
import Chart from "react-google-charts";
import { Spinner } from "reactstrap";
import { Col, Row, Card } from "reactstrap";
import { useEffect, useState } from "react";
import { firestore } from "firebase";
import { useFirestore } from "react-redux-firebase";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DashTron = styled(Jumbotron)`
  background-color: white;
  box-shadow: 1px 2px 2px black;
  border-radius: 0 !important;
`;



const MyChart = styled(Chart)`

`;

const DashboardWrapper = styled.div`
  padding-top: 100px;
`;

const AppCard = styled(Card)`
  box-shadow: 1px 2px 2px black;
  margin: 5px;
  padding: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const IntCard = styled(Card)`
  box-shadow: 1px 2px 2px black;
  margin: 5px;
  padding: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const FollowUpCard = styled(Card)`
  box-shadow: 1px 2px 2px black;
  margin: 5px;
  padding: 5px;
  font-weight: bold;
  cursor: pointer;
`;

function Dashboard(props) {

  const firestore = useFirestore();
  const [applications, setApplications] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [followups, setFollowups] = useState(null);
  const today = new Date();

  useEffect(() => {
    let appData = [];
    let interviewData = [];
    let followupData = [];

    firestore.collection("applications").where("user", "==", props.currentUser.email).get()
      .then((results) => {
        results.forEach((doc) => {
          appData.push({
            data: doc.data(),
            id: doc.id
          });
        });
        setApplications(appData);
        setApplicationData({
          applied: appData.filter(app => app.data.stage === "Applied").length,
          phonescreen: appData.filter(app => app.data.stage === "Phone Screen").length,
          interview: appData.filter(app => app.data.stage === "Interview").length,
          offer: appData.filter(app => app.data.stage === "Offer").length,
          declined: appData.filter(app => app.data.stage === "Declined").length
        });
      }).catch((error) => {
        console.log(error.message);
      });

    firestore.collection("interviews").where("user", "==", props.currentUser.email).get()
      .then((results) => {
        results.forEach((doc) => {
          interviewData.push({
            data: doc.data(),
            id: doc.id
          });
        });
        setInterviews(interviewData);
      }).catch((error) => {
        console.log(error.message);
      });

    firestore.collection("followups").where("user", "==", props.currentUser.email).get()
      .then((results) => {
        results.forEach((doc) => {
          followupData.push({
            data: doc.data(),
            id: doc.id
          });
        });
        setFollowups(followupData);
      }).catch((error) => {
        console.log(error.message);
      });
  }, []);

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
          {/* <h1>Dashboard</h1> */}
        </Container>
        <Container>
          <DashTron>
            {/* <CanvasJSChart options={graphOptions} /> */}
            <h4>Application Dashboard</h4>
            <hr />
            <Row>
              <Col md-6>
                <p><strong>Total Applications: {applications !== null && applications.length}</strong></p>
                <p><strong>Applications per Day</strong></p>
                {applicationData !== null &&
                  <MyChart
                    width={"600px"}
                    height={"250px"}
                    chartType="LineChart"
                    loader={<Spinner />}
                    data={[
                      ["Number", "Apps"],
                      [(today.getMonth() + 1) + "/" + (today.getDate() - 6), 1],
                      [(today.getMonth() + 1) + "/" + (today.getDate() - 5), 2],
                      [(today.getMonth() + 1) + "/" + (today.getDate() - 4), 2],
                      [(today.getMonth() + 1) + "/" + (today.getDate() - 3), 1],
                      [(today.getMonth() + 1) + "/" + (today.getDate() - 2), 2],
                      [(today.getMonth() + 1) + "/" + (today.getDate() - 1), 1],
                      [(today.getMonth() + 1) + "/" + (today.getDate()), 3]
                    ]}
                    options={{
                      hAxis: {
                        title: "Days"
                      },
                      vAxis: {
                        title: "Applications"
                      }
                    }}
                    rootProps={{ "data-testid": "1" }}
                  />}
              </Col>
              <Col md-6>
                <p><strong>Pipeline</strong></p>
                {applicationData !== null &&
                  <MyChart
                    width={"500px"}
                    height={"325px"}
                    chartType="PieChart"
                    loader={<Spinner />}
                    data={[
                      ["Application Stage", "Number of Applications"],
                      ["Applied", applicationData.applied],
                      ["Phone Screen", applicationData.phonescreen],
                      ["Interview", applicationData.interview],
                      ["Offer", applicationData.offer],
                      ["Declined", applicationData.declined]
                    ]}
                    options={{
                      title: "",
                      is3D: true
                    }}
                    rootProps={{ "data-testid": "2" }}
                  />}
              </Col>
            </Row>
          </DashTron>
          <Row>
            <Col className="col-md-6">
              <h4>Recent Applications</h4>
              {applications !== null && applications.filter((app, i) => i < 5).map((app) => {
                let appColor;
                switch (app.data.stage) {
                  case "Applied":
                    appColor = "light";
                    break;
                  case "Phone Screen":
                    appColor = "info";
                    break;
                  case "Interview":
                    appColor = "success";
                    break;
                  case "Offer":
                    appColor = "warning";
                    break;
                  case "Denied":
                    appColor = "danger";
                    break;
                  default:
                    appColor = "light";
                }

                return <AppCard
                  onClick={() => props.onSelect(app.id)}
                  key={app.id}
                  color={appColor}>
                  {app.data.company} - {app.data.title}
                </AppCard>
              })}
            </Col>
            <Col className="col-md-3">
              <h4>Interviews</h4>
              {interviews !== null && interviews.filter((int, i) => i < 5).map((int) => {
                return <IntCard onClick={() => props.onSelect(int.data.appId)}>
                  {int.data.date} - {applications !== null && applications.filter((app) => app.id === int.data.appId)[0].data.company}
                </IntCard>
              })}
            </Col>
            <Col className="col-md-3">
              <h4>Follow Ups</h4>
              {followups !== null && followups.filter((fup, i) => i < 5).map((fup) => {
                return <FollowUpCard onClick={() => props.onSelect(fup.data.appId)}>
                  {fup.data.date} - {applications !== null && applications.filter((app) => app.id === fup.data.appId)[0].data.company}
                </FollowUpCard>
              })}
            </Col>
          </Row>
        </Container>
      </DashboardWrapper>
    </React.Fragment>
  );
}

export default Dashboard;