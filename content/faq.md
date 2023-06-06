# FAQ

The following are problems or questions you might encouter as you use the project

<details>
<summary>Sorry you're device is not supported</summary>

<br>

These happens when you use a device which isn't a desktop, laptop etc. This is because you need a device which can access the developer tools

<br>

**PS:** To acces the developer tools use the shortcut `F12` or `Ctrl+Shift+I`

</details>

<details>
<summary>How can I get an access token</summary>

<br>

1. Login with your account from <https://discord.com/login>
2. Open the developer tools (`F12` or `Ctrl+Shift+I`) and switch to the `Console` tab
3. To grab the token, run the following command

<br>

```javascript
(webpackChunkdiscord_app.push([
  [""],
  {},
  (e) => {
    m = [];
    for (let c in e.c) m.push(e.c[c]);
  },
]),
m)
  .find((m) => m?.exports?.default?.getToken !== void 0)
  .exports.default.getToken();
```

</details>
