import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      }
    };
    
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    };
    
    this.drake = null;
  }
  
  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'in-progress'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'complete'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'complete'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'in-progress'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'complete'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }
  
  renderCards(status) {
    const bgColor = status === 'backlog' ? '#6c757d' : 
                   status === 'in-progress' ? '#007bff' : '#28a745';
    const textColor = status === 'in-progress' ? '#ffffff' : '#000000';
    
    const clients = this.state.clients[
      status === 'backlog' ? 'backlog' : 
      status === 'in-progress' ? 'inProgress' : 'complete'
    ];
    
    return clients.map(c => (
      <div
        key={c.id}
        className="Card"
        data-id={c.id}
        style={{ backgroundColor: bgColor, color: textColor, cursor: 'grab', userSelect: 'none' }}
      >
        <div><strong>{c.name}</strong></div>
        <div>{c.description}</div>
      </div>
    ));
  }
  
  updateCardColor = (el, swimlaneId) => {
    const colorMap = {
      'backlog': '#6c757d',
      'in-progress': '#007bff',
      'complete': '#28a745'
    };
    const textMap = {
      'backlog': '#000000',
      'in-progress': '#ffffff',
      'complete': '#000000'
    };
    
    if (el && colorMap[swimlaneId]) {
      el.style.backgroundColor = colorMap[swimlaneId];
      el.style.color = textMap[swimlaneId];
    }
  };
  
  componentDidMount() {
    this.drake = Dragula([
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current,
    ]);
    
    this.drake.on('drop', (el, target, source) => {
      const swimlaneId = target.id;
      this.updateCardColor(el, swimlaneId);
    });
  }
  
  render() {
    return (
      <div className="Board">
        <div className="Swimlane-column" id="backlog" ref={this.swimlanes.backlog}>
          {this.renderCards('backlog')}
        </div>
        <div className="Swimlane-column" id="in-progress" ref={this.swimlanes.inProgress}>
          {this.renderCards('in-progress')}
        </div>
        <div className="Swimlane-column" id="complete" ref={this.swimlanes.complete}>
          {this.renderCards('complete')}
        </div>
      </div>
    );
  }
}