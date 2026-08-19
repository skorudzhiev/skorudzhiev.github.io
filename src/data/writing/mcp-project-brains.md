---
title: MCP and Project Brains
description: What two product implementations taught me about durable context, bounded tools, human approval, and the work required to turn MCP into a useful product capability.
preview: Two MCP implementations show why context, boundaries, and approval matter.
publishedAt: 2026-08-14
topics:
  - MCP
  - AI product systems
  - Product architecture
  - Human-in-the-loop automation
path: /writing/mcp-project-brains/
canonicalUrl: https://skorudzhiev.github.io/writing/mcp-project-brains/
relatedWork: continuum
relatedCapability: Context-aware product systems
featured: true
external: false
---

A server can initialize correctly, list a set of tools, return valid structured results, and still be nowhere near a useful product.

That distinction became clear while building two very different MCP integrations. One sits beside a local desktop product and stages declarative changes for review. The other connects a private marketing operations system to project context, content workflows, and a self-hosted publishing service.

The transport changed. The product problem did not.

In both cases, MCP was valuable because it provided a standard interface between an AI client and a bounded capability. It did not decide what context was trustworthy, which actions were safe, how a person would review a proposal, or what should happen when an external service failed.

That work belonged to the product.

## The protocol is deliberately smaller than the product

[Model Context Protocol](https://modelcontextprotocol.io/docs/learn/architecture) standardizes how an AI application discovers context and capabilities through primitives such as resources, prompts, and tools. That is useful infrastructure. It replaces a growing collection of one-off model integrations with a shared contract.

But a contract is not an operating model.

An MCP server does not automatically know which source is current, which project owns a piece of evidence, whether a draft has changed since approval, or whether a convincing demo result came from a live provider. It does not give an operator a usable review surface. It does not decide whether the model should be allowed to read, propose, stage, or execute.

Those are product decisions, and they become more important as the tools become more capable.

## What I mean by a project brain

“Project brain” is my shorthand for the durable context a product needs before AI assistance becomes reliable enough to reuse.

It is not a longer system prompt or a folder of loosely related documents. It is a project-scoped model of things that should remain true across sessions and tools:

- the product mission and current stage;
- the audience, desired outcomes, and active constraints;
- approved facts, source material, and prohibited claims;
- decisions, open questions, progress, and known limitations;
- reusable assets, drafts, and the relationships between them;
- observed outcomes and lessons that should shape the next iteration.

The useful property is continuity. A generated result can be traced back to the project that produced it, reviewed against the same constraints, and improved with evidence from what happened afterwards.

MCP then becomes an interface to selected parts of that brain. A client may be allowed to retrieve a project snapshot, ingest a source, validate a proposed structure, or create a local draft. It does not need unrestricted access to every record or every external system.

## Two products, two different boundaries

### Continuum: stage the change, let the product approve it

Continuum is a local-first calculation workspace. Its experimental Blueprint workflow turns a declarative YAML or JSON description into a visual Canvas model.

The local MCP integration exposes a deliberately compact surface: discover the schema, validate a Blueprint, list available Canvases, export one, stage a proposal, and inspect that proposal’s status.

The important tool is not the most powerful one. It is the boundary around `stage`.

An MCP client can prepare a new, merged, or replacement Blueprint, but it cannot silently apply the change. The running desktop application shows the proposal, preserves the current workspace, and gives the user the final approve-or-reject decision. Proposals expire instead of remaining valid indefinitely.

That separation keeps the model useful without pretending that a syntactically valid graph is automatically the right product decision.

### Postiz Chat Bridge: context, operations, and guarded external actions

Postiz Chat Bridge is a private operations system for project-grounded social work. It combines a Marketing Brain with sources, insights, assets, drafts, previews, delivery state, outcomes, and a local audit trail. Postiz remains the publishing and calendar authority.

Its MCP surface is broader because the workflow is broader. An assistant can retrieve project context, ingest evidence, generate directions, prepare media, create local campaign drafts, inspect synchronized provider state, and record outcomes.

The system keeps distinct actions distinct:

- reading project or provider state;
- generating a proposal;
- saving or editing a local draft;
- building a human-visible approval summary;
- confirming the exact approved payload;
- asking the external provider to act;
- recording the result or failure.

Changes to publish-relevant content invalidate stale approvals. Demo behavior is labelled and prevented from quietly contacting live services. Unavailable AI remains unavailable instead of being replaced by a convincing fake response. External writes require a deployment-level gate as well as explicit confirmation of an immutable approval payload.

The result is less magical than “tell the agent to run marketing.” It is also much more useful.

## A trust ladder for MCP tools

I now treat AI-facing product actions as a ladder rather than a binary choice between read-only and autonomous:

1. **Read** — retrieve scoped facts without changing state.
2. **Propose** — create an ephemeral recommendation without saving it.
3. **Stage** — persist a reviewable local change without external effects.
4. **Approve** — show the exact action, target, and consequences to a person.
5. **Execute** — perform only the approved action with idempotency and failure handling.
6. **Learn** — record the outcome so the next proposal can improve.

Not every workflow needs all six levels. The useful design question is which level each tool genuinely requires.

A schema lookup should not ask for confirmation. A local draft does not need the same ceremony as a public post. A destructive or externally visible action should not inherit approval merely because an earlier version of its input was reviewed.

## Supportability is part of the capability

Building the tool handler is usually the short part. Supporting an MCP integration requires the surrounding work:

- stable input and output contracts with validation at the boundary;
- explicit protocol and capability negotiation;
- honest local, demo, unavailable, and connected states;
- authentication and authorization appropriate to the deployment;
- timeouts, cancellation, idempotency, and reconciliation;
- persistence and audit records that survive a process restart;
- health checks, logs, recovery instructions, and safe operational defaults;
- source, packaged, browser, and failure-path tests.

This is why I prefer “MCP integration” or “MCP-enabled product system” to “an MCP.” The server is one component. The maintained capability includes its host product, context model, policy, interface, deployment, and operating procedure.

## The marketable unit is an outcome

Protocol compliance is useful evidence of interoperability. It is not, by itself, a reason for someone to adopt or pay for a product.

A customer may value a calculation workspace that can turn a structured idea into a reviewable model. A small team may value a marketing system that remembers approved positioning, prepares channel-specific drafts, and never publishes behind their back. An engineering group may value a support tool that can inspect an incident and stage a remediation without receiving unrestricted production access.

Those are product capabilities. MCP makes them easier to connect to multiple AI clients, but the value comes from the domain model and the reliability of the workflow.

That is the thesis I can support from the work so far: not that every product needs an MCP server, and not that exposing more tools creates a better agent. The useful pattern is a durable project brain, a narrow interoperable interface, and a product boundary that keeps judgment visible.

MCP is the interface. The system around it is what makes the capability worth using.
