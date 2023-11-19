document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Chat Interface</title><style>@import url(\'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap\');#mcp_chat-container {font-family: \'Open Sans\', sans-serif;position: fixed;bottom: 20px;right: 20px;width: 300px;background-color: #fff;box-shadow: 0 4px 8px rgba(0,0,0,0.1);border-radius: 8px;overflow: hidden;display: flex;flex-direction: column;transform: translateY(100%);visibility: hidden;opacity: 0;z-index: 999;transition: all 0.3s ease;}#mcp_chat-header {background-color: #060912;color: #fff;padding: 10px;display: flex;align-items: center;}#mcp_chat-header-avatar {width: 40px;height: 40px;border-radius: 50%;margin-right: 10px;}#mcp_chat-header-text {flex-grow: 1;}#mcp_chat-header-agent-name {font-weight: bold;}#mcp_chat-header-agent-email {font-size: 0.8em;opacity: 0.75;}#mcp_chat-messages {flex-grow: 1;padding: 10px;overflow-y: auto;background: #f2f2f2;}#mcp_chat-input-container {border-top: 1px solid #ccc;padding: 10px;display: flex;}#mcp_chat-input {flex-grow: 1;border: none;padding: 10px;border-radius: 20px;}#mcp_chat-send-button {background-color: #202a37;color: #fff;border: none;margin-left: 10px;width: 40px;border-radius: 50%;font-size: 16px;width: 50px;height: 50px;padding-top: 5px;padding-left: 8px;}.mcp_send-img {width: 20px;height: 20px;}#mcp_chat-send-button img {filter: invert(1);}/* Hide the default browser focus outline */#mcp_chat-input:focus, #mcp_chat-send-button:focus {outline: none;}.mcp_message {display: flex;flex-direction: column;max-width: 240px;margin-bottom: 8px;word-wrap: break-word;font-size: 0.9rem;}.mcp_user-message {background-color: #202a37;color: #fff;align-self: flex-end;margin-right: 10px;margin-bottom: 10px;font-size: 14px;}.mcp_bot-message {background-color: #cfcfcf;color: #333;margin-right: auto;margin-bottom: 10px;}/* Additional styles for message content for better readability */.mcp_message-content {word-wrap: break-word;padding: 5px;}#mcp_chat-container {min-height: 400px;}#mcp_chat-toggle {position: fixed;bottom: 20px;right: 20px;background-color: #202a37;color: #fff;border: none;border-radius: 50%;width: 50px;z-index: 999;height: 50px;cursor: pointer;box-shadow: 0 4px 8px rgba(0,0,0,0.1);}.mcp_chat-closed {transform: translateY(100%);visibility: hidden;opacity: 0;}.mcp_chat-open {display: none;}#mcp_chat-container:not(.mcp_chat-closed) {transform: translateY(0);visibility: visible;opacity: 1;}#mcp_chat-toggle.mcp_chat-open {display: none;}.mcp_message {display: flex;max-width: 80%;margin-bottom: 10px;word-wrap: break-word;}.mcp_user-message, .mcp_bot-message {border-radius: 16px;padding: 12px 15px; /* Adjust padding for bubbles */box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);font-size: 14px;}.mcp_user-message {background-color: #202a37;color: #fff;align-self: flex-end;}#mcp_typing-area {background-color: #f2f2f2;}.mcp_user-message::after {content: \'\';position: absolute;bottom: 0;right: -10px; /* Tail out from the right side */width: 0;height: 0;border: 10px solid transparent;border-top-color: #202a37;border-bottom: 0;margin-left: -10px;margin-bottom: -10px;}.mcp_bot-message::after {content: \'\';position: absolute;bottom: 0;left: -10px; /* Tail out from the left side */width: 0;height: 0;border: 10px solid transparent;border-top-color: #e5e5ea;border-bottom: 0;margin-right: -10px;margin-bottom: -10px;}#mcp_chat-messages {display: flex;flex-direction: column;padding: 10px 20px; /* Adjust padding inside the messages container */max-height: 300px; /* Adjust to your preference */overflow-y: auto;scroll-behavior: smooth;}#mcp_chat-close-button {background-color: transparent;border: none;color: #fff;font-weight: bold;cursor: pointer;font-size: 10px;position: absolute;top: 15px;right: 10px;}#mcp_chat-close-button img {filter: invert(1);zoom:1.4;}/* Optional: change the \'X\' button color on hover for better user feedback */#mcp_chat-close-button:hover {color: #ddd;}.mcp_typing-indicator {display: flex;justify-content: center;flex-direction: row-reverse;direction: rtl;margin-left: 10px;align-items: center;padding: 12px 15px;background-color: #cfcfcf;border-radius: 16px;margin: 10px 10px 10px 30px; /* Adjust margin to align it to the right like bot messages */max-width: 15%; /* Same as other message bubbles */}.mcp_dot {width: 8px;height: 8px;background-color: #333;border-radius: 50%;margin: 0 2px; /* Spacing between dots */animation: typing 1.4s infinite both;}.mcp_dot:nth-child(1) { animation-delay: -0.32s; }.mcp_dot:nth-child(2) { animation-delay: -0.16s; }@keyframes typing {0% { transform: translateY(0); }28% { transform: translateY(-6px); }44% { transform: translateY(0); }}#mcp_brand-container {text-align: center;padding-top: 5px;padding-bottom: 5px;background: #e1e1e1;font-size: 14px;font-weight: 600;text-decoration: none; /* Optional padding at the bottom */}#mcp_brand-name {font-size: 0.8em; /* Adjust the size of your brand name text as needed */color: #202a37; /* Brand color, you can change this */text-decoration: none!important; /* Remove the underline from the link *//* You can add :hover style to make it clear it\'s clickable */}#mcp_brand-name:hover {text-decoration: underline; /* Re-add underline on hover to indicate a link */}</style></head><body><button id="mcp_chat-toggle">Chat</button><div id="mcp_chat-container" class="mcp_chat-closed"><div id="mcp_chat-header"><button id="mcp_chat-close-button"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyBmaWxsPSIjMDAwMDAwIiB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KICAgIDxwYXRoIGQ9Ik0xNiAwYy04LjgzNiAwLTE2IDcuMTYzLTE2IDE2czcuMTYzIDE2IDE2IDE2YzguODM3IDAgMTYtNy4xNjMgMTYtMTZzLTcuMTYzLTE2LTE2LTE2ek0xNiAzMC4wMzJjLTcuNzIgMC0xNC02LjMxMi0xNC0xNC4wMzJzNi4yOC0xNCAxNC0xNCAxNCA2LjI4IDE0IDE0LTYuMjggMTQuMDMyLTE0IDE0LjAzMnpNMjEuNjU3IDEwLjM0NGMtMC4zOS0wLjM5LTEuMDIzLTAuMzktMS40MTQgMGwtNC4yNDIgNC4yNDItNC4yNDItNC4yNDJjLTAuMzktMC4zOS0xLjAyNC0wLjM5LTEuNDE1IDBzLTAuMzkgMS4wMjQgMCAxLjQxNGw0LjI0MiA0LjI0Mi00LjI0MiA0LjI0MmMtMC4zOSAwLjM5LTAuMzkgMS4wMjQgMCAxLjQxNHMxLjAyNCAwLjM5IDEuNDE1IDBsNC4yNDItNC4yNDIgNC4yNDIgNC4yNDJjMC4zOSAwLjM5IDEuMDIzIDAuMzkgMS40MTQgMHMwLjM5LTEuMDI0IDAtMS40MTRsLTQuMjQyLTQuMjQyIDQuMjQyLTQuMjQyYzAuMzkxLTAuMzkxIDAuMzkxLTEuMDI0IDAtMS40MTR6Ij48L3BhdGg+DQo8L3N2Zz4=" class="mcp_send-img" alt="Send"></button><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgDQoJIHZpZXdCb3g9IjAgMCAxNDQuNzczIDE0NC43NzMiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGNpcmNsZSBzdHlsZT0iZmlsbDojMTJCNUJBOyIgY3g9IjcyLjM4NyIgY3k9IjcyLjM4NiIgcj0iNzIuMzg2Ii8+DQoJPGc+DQoJCTxkZWZzPg0KCQkJPGNpcmNsZSBpZD0iU1ZHSURfMV8iIGN4PSI3Mi4zODciIGN5PSI3Mi4zODYiIHI9IjcyLjM4NiIvPg0KCQk8L2RlZnM+DQoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPg0KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4NCgkJPC9jbGlwUGF0aD4NCgkJPGcgc3R5bGU9ImNsaXAtcGF0aDp1cmwoI1NWR0lEXzJfKTsiPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0YxQzlBNTsiIGQ9Ik0xMDYuOTcxLDExNi45NGMtNC42NjYtOC44MzMtMzQuNjY2LTE0LjM3Ni0zNC42NjYtMTQuMzc2cy0zMCw1LjU0My0zNC42NjYsMTQuMzc2DQoJCQkJYy0zLjQ0OSwxMi4yNTgtNi4zMzQsMjcuODMzLTYuMzM0LDI3LjgzM2g0MWg0MUMxMTMuMzA1LDE0NC43NzMsMTExLjM1NywxMjguMDczLDEwNi45NzEsMTE2Ljk0eiIvPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0U0QjY5MjsiIGQ9Ik03Mi4zMDUsMTAyLjU2NGMwLDAsMzAsNS41NDMsMzQuNjY2LDE0LjM3NmM0LjM4NiwxMS4xMzMsNi4zMzQsMjcuODMzLDYuMzM0LDI3LjgzM2gtNDFWMTAyLjU2NHoNCgkJCQkiLz4NCgkJCTxyZWN0IHg9IjY0LjEzOCIgeT0iODQuNjA2IiBzdHlsZT0iZmlsbDojRjFDOUE1OyIgd2lkdGg9IjE2LjMzNCIgaGVpZ2h0PSIyNy4zMzYiLz4NCgkJCTxyZWN0IHg9IjcyLjMwNSIgeT0iODQuNjA2IiBzdHlsZT0iZmlsbDojRTRCNjkyOyIgd2lkdGg9IjguMTY3IiBoZWlnaHQ9IjI3LjMzNiIvPg0KCQkJPHBhdGggc3R5bGU9Im9wYWNpdHk6MC4xO2ZpbGw6I0REQUM4QzsiIGQ9Ik02NC4xMzgsOTcuMjczYzEuNDY5LDQuMjE3LDcuMzk3LDYuNjM0LDExLjc1MSw2LjYzNA0KCQkJCWMxLjU3NSwwLDMuMTA3LTAuMjY0LDQuNTgzLTAuNzQ3Vjg0LjYwNkg2NC4xMzhWOTcuMjczeiIvPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0YxQzlBNTsiIGQ9Ik05My4zMDUsNjcuMzU3YzAtMTcuMDc0LTkuNDAyLTI2Ljc4My0yMS0yNi43ODNjLTExLjU5OCwwLTIxLDkuNzA5LTIxLDI2Ljc4Mw0KCQkJCXM5LjQwMiwzMC45MTcsMjEsMzAuOTE3QzgzLjkwMyw5OC4yNzQsOTMuMzA1LDg0LjQzMiw5My4zMDUsNjcuMzU3eiIvPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0U0QjY5MjsiIGQ9Ik05MC4xMDksNzkuMTk1Yy0zLjgwNy0wLjQyNC02LjM3Ny00Ljc4My01LjczMi05LjczMmMwLjYzNy00Ljk1Myw0LjI0Mi04LjYzLDguMDUxLTguMjA5DQoJCQkJYzMuODA1LDAuNDIyLDYuMzcxLDQuNzc5LDUuNzI5LDkuNzMyQzk3LjUxNyw3NS45MzksOTMuOTE2LDc5LjYxMyw5MC4xMDksNzkuMTk1eiIvPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0YxQzlBNTsiIGQ9Ik00Ni42MDMsNzAuOTg2Yy0wLjY0My00Ljk1MywxLjkyNC05LjMxMSw1LjcyNi05LjczMmMzLjgxMS0wLjQyMSw3LjQxNiwzLjI1Niw4LjA1NSw4LjIwOQ0KCQkJCWMwLjY0Myw0Ljk0OS0xLjkzLDkuMzA5LTUuNzM0LDkuNzMyQzUwLjg0Myw3OS42MTMsNDcuMjQyLDc1LjkzOSw0Ni42MDMsNzAuOTg2eiIvPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0U0QjY5MjsiIGQ9Ik05My4zMDUsNjcuMzU3YzAtMTcuMDc0LTkuNDAyLTI2Ljc4My0yMS0yNi43ODN2NTcuN0M4My45MDMsOTguMjc0LDkzLjMwNSw4NC40MzIsOTMuMzA1LDY3LjM1N3oNCgkJCQkiLz4NCgkJCTxwYXRoIHN0eWxlPSJmaWxsOiMwRjMwM0Y7IiBkPSJNNjIuMzcxLDkwLjgxNWMwLDAtOS4wNTctNy4zODEtNy4wNDQtMTcuMTA3YzIuMDEyLTkuNzI3LDcuMDQ0LTExLjQwMyw3LjA0NC0xNS43NjYNCgkJCQljOC4zODUsMTAuMDY0LDE1Ljc2NywxNy4xMDUsMjkuMTgzLDEzLjQxN2M0LjAyNSwyLjM0OS0xLjAwNiwxNC40MjctNy4wNDUsMjAuNzk5YzE3LjEwOC05LjM5MywzNi44OTgtNDMuOTQyLTQuMzYxLTU3LjM2MQ0KCQkJCUMzOC44ODgsMjEuMzc5LDI3LjE1LDg4LjgwMyw2Mi4zNzEsOTAuODE1eiIvPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0YzNjQxRTsiIGQ9Ik03Mi4zMDQsNTEuMTU5YzEwLjg0LDAsMTkuODQ1LDcuODM0LDIxLjY3OCwxOC4xNDhjMC4yMjQtMS4yNiwwLjM0Ny0yLjU1NCwwLjM0Ny0zLjg3Nw0KCQkJCWMwLTEyLjE2My05Ljg2LTIyLjAyNC0yMi4wMjUtMjIuMDI0Yy0xMi4xNjMsMC0yMi4wMjMsOS44NjEtMjIuMDIzLDIyLjAyNGMwLDEuMzIzLDAuMTIzLDIuNjE3LDAuMzQ4LDMuODc3DQoJCQkJQzUyLjQ2LDU4Ljk5Myw2MS40NjQsNTEuMTU5LDcyLjMwNCw1MS4xNTl6Ii8+DQoJCQk8cGF0aCBzdHlsZT0iZmlsbDojRkE1ODJBOyIgZD0iTTU2LjI4NywxMDYuNTc3YzIuOTM4LDEuNTc0LDkuODA3LDQuODU1LDE2LjAxNyw0Ljg1NWM4LjE2OCwwLDE4Ljg0NS00LDE4Ljg0NS00bC0xLjQ2OS0wLjQyMw0KCQkJCWMtMy4zNDEtMS4wODktNi42NjEtMS45OTQtOS40OTctMi42OThjLTguMTE4LDQuODY1LTE2LjAzNiwwLjA3Ni0xNi4wNDQsMC4wNzFDNjEuNzU2LDEwNC45NzksNTkuMDUsMTA1LjcxNSw1Ni4yODcsMTA2LjU3N3oiLz4NCgkJCTxwYXRoIHN0eWxlPSJmaWxsOiMxNTk0QTM7IiBkPSJNMTA2Ljk3MSwxMTYuOTRjLTEuNTc4LTIuOTg3LTYuMDU2LTUuNTk2LTExLjI4Ny03Ljc0M2MtMi44ODgsMTAuMTk2LTEyLjI1OCwxNy42Ny0yMy4zNzksMTcuNjcNCgkJCQlzLTIwLjQ5MS03LjQ3NC0yMy4zNzktMTcuNjdjLTUuMjMxLDIuMTQ4LTkuNzA5LDQuNzU2LTExLjI4Nyw3Ljc0M2MtMy40NDksMTIuMjU4LTYuMzM0LDI3LjgzMy02LjMzNCwyNy44MzNoNDFoNDENCgkJCQlDMTEzLjMwNSwxNDQuNzczLDExMS4zNTcsMTI4LjA3MywxMDYuOTcxLDExNi45NHoiLz4NCgkJCTxwYXRoIHN0eWxlPSJmaWxsOiNGQTU4MkE7IiBkPSJNMTE5Ljk0MSwxMDEuMTJjLTQuNS0xLjYwNC0xMS42NjcsMS44OTYtMTYuMzc1LDEuNDQ0Yy01LjE0NS0wLjQ5NC03LjkzLDMuMDAyLTExLjA5NCwyLjM2OA0KCQkJCWMtNi4wODMtMS4yMTktNi42NDMsMC45ODUtNi42NDMsMC45ODVzLTEuNDcxLTIuOTg1LDQuNjEzLTIuMDExYzYuMDg0LDAuOTc1LDEwLjczNC0xLjkzMywxMi4xMjQtMy44MDgNCgkJCQljMi4xMDEtMi44MzQsOS4xMjUtMi4xNjYsOS4xMjUtMi4xNjZsLTMuNjY2LTQuMjUxYy0yLjU4My0wLjUtNi40MTctMC4xNjctOC41LDMuNDE3Yy0yLjA4MywzLjU4NC00LDQtOS44NDUsMy4zMzMNCgkJCQljLTUuODQ1LTAuNjY3LTkuNDk3LDMuODc5LTkuNDk3LDMuODc5bDExLjA1LDMuMjE2YzAsMCwyLjI4LDAuNjIyLDQuNjE0LDAuNTYyYzIuMzM0LTAuMDYxLDQuNzc0LTIuNDY0LDkuNjU2LTIuMDk0DQoJCQkJYzUuMjI5LDAuMzk2LDkuOTc5LTIuMTQ2LDE2LjEzMiwwLjE1NEwxMTkuOTQxLDEwMS4xMnoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg==" alt="User Avatar" id="mcp_chat-header-avatar"><div id="mcp_chat-header-text"><div id="mcp_chat-header-agent-name">Sofia Davis</div><div id="mcp_chat-header-agent-email">sofia@fitness-connect.com</div></div></div><div id="mcp_chat-messages"><!-- Messages will be dynamically added here --></div><div id="mcp_typing-area"><div id="mcp_typing-indicator" class="mcp_message mcp_bot-message mcp_typing-indicator" style="display: none;"><div class="mcp_dot"></div><div class="mcp_dot"></div><div class="mcp_dot"></div></div></div><div id="mcp_chat-input-container"><input type="text" id="mcp_chat-input" placeholder="Type your message..."><button id="mcp_chat-send-button"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xMS41MDAzIDEySDUuNDE4NzJNNS4yNDYzNCAxMi43OTcyTDQuMjQxNTggMTUuNzk4NkMzLjY5MTI4IDE3LjQ0MjQgMy40MTYxMyAxOC4yNjQzIDMuNjEzNTkgMTguNzcwNEMzLjc4NTA2IDE5LjIxIDQuMTUzMzUgMTkuNTQzMiA0LjYwNzggMTkuNjcwMUM1LjEzMTExIDE5LjgxNjEgNS45MjE1MSAxOS40NjA0IDcuNTAyMzEgMTguNzQ5MUwxNy42MzY3IDE0LjE4ODZDMTkuMTc5NyAxMy40OTQyIDE5Ljk1MTIgMTMuMTQ3MSAyMC4xODk2IDEyLjY2NDhDMjAuMzk2OCAxMi4yNDU4IDIwLjM5NjggMTEuNzU0MSAyMC4xODk2IDExLjMzNTFDMTkuOTUxMiAxMC44NTI5IDE5LjE3OTcgMTAuNTA1NyAxNy42MzY3IDkuODExMzVMNy40ODQ4MyA1LjI0MzAzQzUuOTA4NzkgNC41MzM4MiA1LjEyMDc4IDQuMTc5MjEgNC41OTc5OSA0LjMyNDY4QzQuMTQzOTcgNC40NTEwMSAzLjc3NTcyIDQuNzgzMzYgMy42MDM2NSA1LjIyMjA5QzMuNDA1NTEgNS43MjcyOCAzLjY3NzcyIDYuNTQ3NDEgNC4yMjIxNSA4LjE4NzY3TDUuMjQ4MjkgMTEuMjc5M0M1LjM0MTc5IDExLjU2MSA1LjM4ODU1IDExLjcwMTkgNS40MDcgMTEuODQ1OUM1LjQyMzM4IDExLjk3MzggNS40MjMyMSAxMi4xMDMyIDUuNDA2NTEgMTIuMjMxQzUuMzg3NjggMTIuMzc1IDUuMzQwNTcgMTIuNTE1NyA1LjI0NjM0IDEyLjc5NzJaIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8L3N2Zz4=" class="mcp_send-img" alt="Send"></button></div><div id="mcp_brand-container"><a href="https://zero-one.online" target="_blank" id="mcp_brand-name"><span>Powered by </span>Zero One</a></div></div><script src="main.js"></script></body></html>');
