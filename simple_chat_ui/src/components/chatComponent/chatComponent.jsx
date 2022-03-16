import React from "react";
import { HubConnection } from "signalr-client-react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import axios from "axios";

export const ChatComponentChild = () => {
  return;
};

export class ChatComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hubConnection: null,
      data: [],
    };
  }
  componentDidMount = () => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44315/signalr")
      .configureLogging(LogLevel.Information)
      .build();
    hubConnection.on("BroadcastMessage", (response) => {
      const { data } = this.state;

      console.log(response);
      data.push(response)
      this.setState({data: data});
    });
    hubConnection
      .start()
      .then(() => {
        console.log("Connection started!");
        hubConnection
          .invoke("BroadcastMessage", {
            timeStamp: "10",
            from: "client",
            message: "message",
          })
          .catch((err) => console.log(err));
        this.setState({ hubConnection: hubConnection });
      })
      .catch((err) =>
        console.log("Error while establishing connection :", err)
      );
    axios
      .get("https://localhost:44315/weatherforecast")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  onSend = () => {
    this.state.hubConnection.invoke("BroadcastMessage", {
      timeStamp: "10",
      from: "client",
      message: "message",
    });
  };

  render() {
    return (
      <div className="container">
        <div className="msg-header">
          <div className="msg-header-img">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWEgoDuRh5njIhMqXMZ4oKoK3aoJHXvQIYlw&usqp=CAU"
              alt="avatar"
            />
          </div>
          <div className="active">
            <h4>Jonh Lewis</h4>
            <h6>3 hours ago...</h6>
          </div>
          <div className="header-icons">
            <i className="fa fa-phone"></i>
            <i className="fa fa-video-camera"></i>
            <i className="fa fa-info-circle"></i>
          </div>
        </div>
        <div className="chat-page">
          <div className="msg-box">
            <div className="chats">
              <div className="msg-page">
                <div className="received-chats">
                  <div className="received-chats-img">
                    <img
                      src="https://thao68.com/wp-content/uploads/2022/02/avatar-hero-team-15.jpg"
                      alt="receiver"
                    />
                  </div>
                  <div className="received-msg">
                    <div className="received-msg-inbox">
                      <p>Hi!! This is message from Jonh Lewis</p>
                      <span className="time">11:00PM | October 11</span>
                    </div>
                  </div>
                </div>

                <div className="outgoing-chats">
                  <div className="outgoing-chats-img">
                    <img
                      src="https://thao68.com/wp-content/uploads/2022/02/avatar-hero-team-15.jpg"
                      alt="receiver"
                    />
                  </div>
                  <div className="outgoing-chats-msg">
                    <div className="outgoing-msg-inbox">
                      <p>Hi!! This is message from Jonh Lewis</p>
                      <span className="time">11:00PM | October 11</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.data.map((data, index) => <div key={index}>{data.message}</div>)}
            <button onClick={() => this.onSend()}> send </button>
          </div>
        </div>
      </div>
    );
  }
}
