import api, { route } from "@forge/api";

export async function run(event) {
  // Fetch issues from project TIM
  const response = await api.asApp().requestJira(route`/rest/api/3/search?jql=project=TIM`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  const data = await response.json();

  // Extract task details and assigned users
  const tasks = data.issues.map(issue => {
    return {
      key: issue.key,
      summary: issue.fields.summary,
      assignee: issue.fields.assignee ? issue.fields.assignee.displayName : "Unassigned",
    };
  });

  return {
    body: JSON.stringify(tasks),
  };
}
