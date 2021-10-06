define({ "api": [
  {
    "type": "POST",
    "url": "/users/login",
    "title": "API文档事例",
    "description": "<p>API文档事例</p>",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "users",
    "name": "PostUsersLogin"
  }
] });
