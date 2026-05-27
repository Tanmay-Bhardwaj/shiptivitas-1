import React from 'react';

export default class Swimlane extends React.Component {
  render() {
    const { name, clients, dragulaRef } = this.props;
    
    const bgColor = name.toLowerCase() === 'backlog' ? '#6c757d' : 
                    name.toLowerCase() === 'in progress' ? '#007bff' : '#28a745';
    const textColor = name.toLowerCase() === 'in progress' ? '#ffffff' : '#000000';
    
    const cards = clients.map(c => (
      <div
        key={c.id}
        className="Card"
        data-id={c.id}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div><strong>{c.name}</strong></div>
        <div>{c.description}</div>
      </div>
    ));
    
    return (
      <div className="Swimlane-column" id={name.toLowerCase().replace(' ', '-')} ref={dragulaRef}>
        <div className="Swimlane-title">{name}</div>
        <div className="Swimlane-dragColumn">
          {cards}
        </div>
      </div>
    );
  }
}