---
title: Architecture as a living document
description: Why Continuum keeps visual models, decisions, Mermaid source, and calculations in one local-first Canvas.
preview: Keep architecture diagrams beside the source, evidence, and decisions behind them.
publishedAt: 2026-08-20
topics:
  - Product architecture
  - Mermaid
  - Canvas
  - Local-first
path: /writing/architecture-as-a-living-document/
canonicalUrl: https://skorudzhiev.medium.com/architecture-as-a-living-document-cb86df0e1bb5
mediumUrl: https://skorudzhiev.medium.com/architecture-as-a-living-document-cb86df0e1bb5
relatedWork: continuum
relatedCapability: End-to-end product engineering
featured: true
external: false
---

<figure>
  <img src="/assets/images/writing/architecture-as-a-living-document/01.png" alt="Layered paper architecture diagrams linked by copper paths, with a central network connecting flowcharts and sequence diagrams." width="1400" height="788" decoding="async" />
</figure>

The first version of an architecture diagram is usually useful. It captures a system while the trade-offs are still fresh and the boundaries are still being discussed.

The problem arrives later.

The diagram becomes a screenshot in a ticket. Its source sits in another folder. The reason behind one arrow survives only in a chat transcript. A calculation that justified a limit lives in a spreadsheet with an unclear name. Every individual artifact still exists, but the logic between them has disappeared.

I wanted Continuum to handle that connective material more deliberately.

## A diagram is more useful when its source stays close

Continuum’s Mermaid Graph Explorer treats the rendered diagram and its source as two views of the same workspace object. The source remains canonical. The rendered model is a strict preview rather than a separate export that can quietly drift.

Graph Explorer can find persistent Mermaid nodes across the active Canvas and open the source beside a larger preview. It includes starters for flowcharts, sequences, states, classes, entity relationships, and the Continuum architecture itself. Zoom helps with inspection, but the important capability is simpler: the diagram remains editable text.

That matters because architecture changes rarely arrive as a complete redesign. A service gets split. A data path becomes asynchronous. A human review step appears between proposal and persistence. Text makes those changes reviewable and portable in a way that a flattened image does not.

## The diagram is only part of the decision

A good system map does not explain why the system has that shape.

Continuum Canvas adds room for the surrounding evidence: markdown notes, checklists, code, local images, workspace references, groups, technical shapes, and decision nodes for options, evidence, risks, and outcomes. A Mermaid model can sit beside the constraint that shaped it and the calculation that tested it.

This is not an attempt to turn the Canvas into a universal project-management system. The scope is intentionally personal and local-first. The Canvas is useful because the relationship between the pieces stays visible without requiring an account or a shared cloud workspace.

The architecture sample in the product demonstrates that idea directly. It maps the browser and desktop surfaces, the local document store, Canvas and Graph Explorer, Continuum Blueprint, and the macOS MCP bridge. The example is also a real Canvas document, so the feature advertises itself through the same format it is explaining.

<figure>
  <a href="/assets/images/writing/architecture-as-a-living-document/02.jpeg" aria-label="View the Mermaid Graph Explorer screenshot at full size">
    <img src="/assets/images/writing/architecture-as-a-living-document/02.jpeg" alt="Continuum Mermaid Graph Explorer displaying editable architecture source alongside its rendered system diagram." width="1280" height="720" loading="lazy" decoding="async" />
  </a>
</figure>

## A declarative path into the Canvas

Dragging every node by hand is useful for exploration but inefficient for a model that already has structure. Continuum Blueprint provides a reviewed YAML or JSON representation for semantic node keys, native content, geometry, groups, layout direction, and labeled relationships.

The review step is part of the format’s value.

Blueprint validates references, URLs, group depth, graph size, and other structural constraints before workspace data changes. It renders a read-only preview before offering three explicit application modes: create a new Canvas, merge beside the current content, or replace the current Canvas after confirmation.

The same flow works without an AI provider. “Map an idea” can use a separately configured OpenAI-compatible endpoint, but authored Blueprint source and preview remain useful on their own. Provider errors, cancellation, refusals, and invalid output leave the Canvas unchanged.

## Local-first is a boundary, not a slogan

The browser workspace and packaged desktop app use separate local stores. There is no cloud synchronization or account recovery. A complete workspace backup is the deliberate way to move local documents and binary Canvas assets.

Those limits belong in the product story because they affect real use. Local-first does not remove the need for backups, and it does not make every surface identical. It means the workspace remains under the control of the current browser or app data store, with explicit export and restore paths.

<figure>
  <a href="/assets/images/writing/architecture-as-a-living-document/03.jpeg" aria-label="View the architecture Canvas screenshot at full size">
    <img src="/assets/images/writing/architecture-as-a-living-document/03.jpeg" alt="The Continuum architecture diagram saved as a native node on a Canvas, with the workspace sidebar and diagram controls visible." width="1280" height="720" loading="lazy" decoding="async" />
  </a>
</figure>

## Keep the logic

The feature started with a practical frustration: important reasoning was scattered across files that each preserved the wrong slice of the work.

The result is not a new document type so much as a stronger connection between existing ones. Mermaid keeps the model editable. Canvas keeps the context visible. Blueprint provides a reviewable declarative path. Calculations remain live beside the decisions they support.

An answer can be copied anywhere. The logic around it deserves somewhere durable to live.
