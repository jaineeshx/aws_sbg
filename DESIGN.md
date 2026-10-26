# AWS SBG homepage direction

## Brief

- Audience: students at RV University who want practical experience building with AWS.
- Job: explain the community quickly, show its work, and guide interested students toward the community links.
- Content rule: use the project and community facts already in the site. Do not invent project screenshots, results, or event dates.

## Concept card

- Idea: A student builder workbench that shows how learning becomes a shipped project.
- Metaphor: A calm cloud engineering workbench: clear labels, useful system details, one live terminal.
- Signature: The interactive terminal in the hero; it gives visitors a tactile way to explore the page.
- Emotion: Focused, curious, welcoming.
- Motion verb: Resolve: small elements settle into place; the page itself scrolls naturally.
- Screenshot: A plain-language promise beside the live terminal, with real community facts beneath.

Three directions considered:

| Direction | Anchor | Signature | Originality | Fit | Feasibility | Portability |
|---|---|---|---:|---:|---:|---:|
| Builder workbench | Existing interactive shell and AWS project material | Explore sections from the hero terminal | 4 | 5 | 5 | 2 |
| RVU field notes | Student community and campus context | A field-note page of real build recaps | 3 | 4 | 4 | 3 |
| Deployment pipeline | Build, deploy, debug, share principles | One project state resolves as you scroll | 3 | 4 | 3 | 4 |

Selected the workbench because it uses a real interaction already present in the project and carries through to project metadata without needing invented imagery.

## Art direction

- Ground: `#080A0D`; surface: `#11151A`; ink: `#F4F5F6`; muted: `#A3AAB3`; line: `rgba(255,255,255,.10)`; accent: AWS orange `#FF9900`.
- Type: retain Space Grotesk for display and reading, JetBrains Mono only for terminal and technical metadata.
- Grid: centered 1160 px content width; 12 columns on desktop and one composed column on phones.
- Shape: 16 px panels, 999 px pills; avoid repeating decorative gradients.
- Rhythm: airy hero, compact featured work, varied statement and event sections.
- Motion: short opacity/transform entrances and terminal typing. No scroll pinning, page-wide cloud animation, or stacked-card overlap. Reduced-motion users see all content immediately.

## Homepage composition

```text
NAV      Brand | Projects Events Team Notes                      Join
HERO     Clear promise + short explanation | Interactive terminal
         Existing community metrics, then one strong project CTA
WORK     One featured project with honest details, then project index
MISSION  Four quiet principles in a readable list/grid
EVENTS   Upcoming event if dated; otherwise point to the verified Meetup page
PEOPLE   Team directory with real portraits or initials fallback
NOTES    One build log with a real external destination
JOIN     Cohort tracks and verified social/community destinations
FOOTER   Useful navigation and live community links
```

## Assumptions and content to confirm

- Project names, descriptions, member names, and hero metrics are retained from the current source and were not independently verified.
- Replace placeholder `#` project/social URLs with live destinations before using them as calls to action.
- Add real project screenshots and member portraits when available; the current repository contains neither.
- Replace the expired/tentative event entries with confirmed future events before listing dates.
