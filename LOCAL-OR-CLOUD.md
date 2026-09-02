# Local or Cloud

## Local mode

Local mode is the recommended starting point.

Choose it if you want to build lists, research markets, write campaigns, manage clients, and prepare uploads while working from your computer.

Local mode also includes four on-demand operational agents: domain health, campaign monitoring, interested-reply review, and intent-signal research. They run when you ask; they are not scheduled.

You need:

- this folder;
- ChatGPT Work Local, Claude Code/Desktop, or Codex;
- Node.js for the included list-cleaning and upload utilities.

Local mode can call APIs when you provide credentials, but it only runs while your computer and AI session are active.

## Cloud mode

Cloud mode is optional. It is for students who want the system to keep working when their computer is off.

It can support:

- a Railway-hosted worker;
- PostgreSQL operational history;
- sequencer webhooks;
- Slack alerts and approvals;
- an interested-reply agent;
- scheduled domain-health and intent-signal checks;
- ChatGPT access from a phone or another device.

Cloud mode requires additional accounts, credentials, and setup. It should be added only after local onboarding works and the student understands the basic workflow.

## What cloud mode does not change

- The student still owns their credentials and data.
- Campaign activation and external sending remain approval-gated unless the student explicitly changes a documented safety rule.
- GitHub remains the stable knowledge layer.
- Railway/PostgreSQL stores changing operational records.

The on-demand agents are included in the local product. The complete one-click Railway installer for automatic reply webhooks, Slack approvals, schedules, and phone access to live account data is a separate cloud module. Until that module is included in a numbered release, do not assume those always-on cloud features are installed.
