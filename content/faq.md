# FAQ

The following are problems or questions you might encouter as you use the project

<details>
<summary>Sorry you're device is not supported</summary>

This usually occurs when you're using a device (phones or tablets) which can't easily access the devtools. To fix this, you can use a computer (as they can allow you access the devtools with commands like `F12` of `Ctrl+Shift+I`)

</details>

<details>
<summary>How can I get an access token</summary>

<br>

When you're ready follow this steps (while logged in):

1. Login in into your account from <https://discord.com/login>
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
