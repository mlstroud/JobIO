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
  const [appsPerDay, setAppsPerDay] = useState(null);

  const today = new Date();
  let graphDates = [today];

  for (let i = 1; i < 10; i++) {
    let newDay = new Date();
    newDay.setDate(today.getDate() - i);
    graphDates.push(newDay);
  }

  useEffect(() => {
    let appData = [];
    let interviewData = [];
    let followupData = [];
    let graphData = [];

    firestore.collection("applications").where("user", "==", props.currentUser.email).get()
      .then((results) => {
        results.forEach((doc) => {
          appData.push({
            data: doc.data(),
            id: doc.id
          });
        });

        setApplications(appData);

        graphData = [
          appData.filter((app) => app.data.appliedDate.toDate().getMonth() === graphDates[0].getMonth()
            && app.data.appliedDate.toDate().getDate() === graphDates[0].getDate()).length,
          appData.filter((app) => app.data.appliedDate.toDate().getMonth() === graphDates[1].getMonth()
            && app.data.appliedDate.toDate().getDate() === graphDates[1].getDate()).length,
          appData.filter((app) => app.data.appliedDate.toDate().getMonth() === graphDates[2].getMonth()
            && app.data.appliedDate.toDate().getDate() === graphDates[2].getDate()).length,
          appData.filter((app) => app.data.appliedDate.toDate().getMonth() === graphDates[3].getMonth()
            && app.data.appliedDate.toDate().getDate() === graphDates[3].getDate()).length,
          appData.filter((app) => app.data.appliedDate.toDate().getMonth() === graphDates[4].getMonth()
            && app.data.appliedDate.toDate().getDate() === graphDates[4].getDate()).length,
          appData.filter((app) => app.data.appliedDate.toDate().getMonth() === graphDates[5].getMonth()
            && app.data.appliedDate.toDate().getDate() === graphDates[5].getDate()).length,
          appData.filter((app) => app.data.appliedDate.toDate().getMonth() === graphDates[6].getMonth()
            && app.data.appliedDate.toDate().getDate() === graphDates[6].getDate()).length,
          appData.filter((app) => app.data.appliedDate.toDate().getMonth() === graphDates[7].getMonth()
            && app.data.appliedDate.toDate().getDate() === graphDates[7].getDate()).length,
          appData.filter((app) => app.data.appliedDate.toDate().getMonth() === graphDates[8].getMonth()
            && app.data.appliedDate.toDate().getDate() === graphDates[8].getDate()).length,
          appData.filter((app) => app.data.appliedDate.toDate().getMonth() === graphDates[9].getMonth()
            && app.data.appliedDate.toDate().getDate() === graphDates[9].getDate()).length
        ];

        setAppsPerDay(graphData);

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

  return (
    <React.Fragment>
      <DashboardWrapper>
        <Container>
          {/* <h1>Dashboard</h1> */}
        </Container>
        <Container>
          <DashTron>
            <h4>Application Dashboard</h4>
            <hr />
            <Row>
              <Col md-6>
                <p><strong>Total Applications: {applications !== null && applications.length}</strong></p>
                <p><strong>Applications per Day</strong></p>
                {applicationData !== null &&
                  <MyChart
                    width={"100%"}
                    height={"250px"}
                    chartType="LineChart"
                    loader={<Spinner />}
                    data={[
                      ["Number", "Apps"],
                      [`${graphDates[9].getMonth() + 1}/${graphDates[9].getDate()}`, appsPerDay[9]],
                      [`${graphDates[8].getMonth() + 1}/${graphDates[8].getDate()}`, appsPerDay[8]],
                      [`${graphDates[7].getMonth() + 1}/${graphDates[7].getDate()}`, appsPerDay[7]],
                      [`${graphDates[6].getMonth() + 1}/${graphDates[6].getDate()}`, appsPerDay[6]],
                      [`${graphDates[5].getMonth() + 1}/${graphDates[5].getDate()}`, appsPerDay[5]],
                      [`${graphDates[4].getMonth() + 1}/${graphDates[4].getDate()}`, appsPerDay[4]],
                      [`${graphDates[3].getMonth() + 1}/${graphDates[3].getDate()}`, appsPerDay[3]],
                      [`${graphDates[2].getMonth() + 1}/${graphDates[2].getDate()}`, appsPerDay[2]],
                      [`${graphDates[1].getMonth() + 1}/${graphDates[1].getDate()}`, appsPerDay[1]],
                      [`${graphDates[0].getMonth() + 1}/${graphDates[0].getDate()}`, appsPerDay[0]]
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
                    width={"100%"}
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