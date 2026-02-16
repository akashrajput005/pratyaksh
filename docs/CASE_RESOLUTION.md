# Case Resolution Protocol 🏁🛡️

The **Case Resolution Protocol** governs the lifecycle of a reported civic breach on the Solaris Grid, from initial forensic deployment to semantic closure.

## 🔄 The Resolution Lifecycle

### 1. Status: OPEN 🔴
Upon submission, a report is instantly broadcasted to the **Spatial Matrix**.
- **Visibility:** Visible to all citizens and officials in the local ward node.
- **Action:** Neighbors can upvote/corroborate the evidence.
- **Forensics:** AI analyzes the "Before" state and assigns a category and integrity score.

### 2. Status: IN PROGRESS 🟡
Assigned to a ward official for physical verification or contractor dispatch.
- **Official Interface:** Ward admins use the `Grid Forensic Stream` to prioritize cases based on AI confidence.

### 3. Verification & Closure: RESOLVED 🟢
Closing a case requires an **AI Semantic Audit** to prevent fraudulent closure.

#### The "Resolve Case" Flow:
- **Action:** Admins click the "Resolve Case" button on the dashboard.
- **Backend Mutation:** The `updateIssueStatus` server action updates the database state to `RESOLVED`.
- **UI Persistence:** The item is badges with a `VERIFIED RESOLUTION` tag and remains on the grid as an "Accountability Log."

## 🤖 AI Semantic Verification
In the full Solaris V4 specification, resolution requires a follow-up "After" photo.
- **Comparison Engine:** `vision-system.verifyResolution()` compares the "Before" and "After" states.
- **Audit Logic:** Only if the AI detects a 90%+ match in location and 100% removal of the issue (e.g., pothole filled) will the grid accept the resolution.

## 📈 Impact on Citizen Rank
- **Resolution XP:** Reporters receive **Impact XP** bonuses when their reported cases are successfully resolved.
- **Trust Level:** Consistently reporting resolvable issues upgrades the citizen from **Solaris Citizen** to **Gold Citizen** status.
