


const schema = {
  "timestamp": "2024-10-21T10:45:00Z",
  "system": "robot" | "user" | "app" | "other",
  "event_type": "action" | "view" | "error" | "status_update" | "etc",
  "event_description": "Detailed description of what happened",
  "metadata": {
    "user_id": "optional",
    "robot_id": "optional",
    "resource": "optional, could be page name, robot command, etc.",
    "details": {
      "key": "value pairs of relevant data (e.g., user_action, robot_movement)"
    }
  }
}

const example = {
    "timestamp": "2024-10-21T10:46:00Z",
    "system": "user",
    "event_type": "view",
    "event_description": "User viewed blog post",
    "metadata": {
      "user_id": "user_456",
      "resource": "hashirama.blog/post/123",
      "details": {
        "session_duration": "120 seconds",
        "scroll_depth": "75%"
      }
    }
  }
  
//   https://github.com/ollama/ollama-js