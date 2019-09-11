import * as React from "react";
import Dashboard from "../../components/dashboard"

interface Props {
  match: any;
  actions: any;
}

interface State {
  latestCommitSha: string;
}

export default class DashboardView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      latestCommitSha: null,
    };
    this.checkIfNewCommit()
  }

  checkIfNewCommit() {
    fetch("https://api.github.com/repos/blimp-live/blimp-web/commits/master")
      .then(res => res.json())
      .then(
        (result) => {
          if (this.state.latestCommitSha && result["sha"] !== this.state.latestCommitSha) {
            window.location.reload();
          }
          this.setState({
            latestCommitSha: result["sha"],
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("GitHub API error")
        }
      )
  }

  componentDidMount() {
    setInterval(() => {
      this.checkIfNewCommit()
    }, 180000);
  }

  render() {
    return (
      <div>
        <title>Hack The North</title>
        <Dashboard />
      </div>
    );
  }
}
