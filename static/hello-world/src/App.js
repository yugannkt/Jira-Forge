import React, { useEffect, useState } from 'react';
import { requestJira } from '@forge/bridge';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await requestJira('/rest/api/3/search?jql=project=TIM');
      const data = await response.json();
      setTasks(data.issues.map(issue => ({
        key: issue.key,
        summary: issue.fields.summary,
        assignee: issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned',
      })));
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <table>
        <thead>
          <tr>
            <th>Task Key</th>
            <th>Summary</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.key}>
              <td>{task.key}</td>
              <td>{task.summary}</td>
              <td>{task.assignee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
