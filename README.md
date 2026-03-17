# MyNaksh Chat – React Native Technical Assessment

This project implements an **interactive astrology chat interface** for the MyNaksh platform.
The focus of the assignment is on **smooth micro-interactions, gesture-based UI, and animated feedback** using modern React Native tools.

The chat experience supports:

* Swipe-to-Reply interactions
* Long-press emoji reactions
* AI message feedback (Like / Dislike with feedback chips)
* End chat rating flow
* Smooth UI animations using Reanimated

The goal was to demonstrate **clean architecture, smooth animations, and responsive gesture handling**.

---

# Tech Stack

* React Native
* TypeScript
* React Native Reanimated 3
* React Native Gesture Handler
* Redux Toolkit

---

# Project Setup

## 1. Install dependencies

```bash
npm install
```

## 2. Start Metro

```bash
npx react-native start
```

## 3. Run Android

```bash
npx react-native run-android
```

---

# Features Implemented

## 1. Swipe to Reply

Users can swipe a message bubble to the right to initiate a reply.

Interaction flow:

```
Swipe message → reply icon appears
Release → message springs back
Reply preview appears above the input
Cancel clears reply state
```

The message position is animated using **Reanimated shared values**, and the gesture is handled with **React Native Gesture Handler Pan gesture**.

---

## 2. Message Reactions (Long Press)

Long-pressing a message displays a horizontal emoji reaction bar.

Example reactions:

```
🙏 ✨ 🌙
```

When an emoji is selected:

```
emoji → attached below message bubble
reaction stored in Redux state
emoji bar closes
```

This interaction is designed to feel **similar to WhatsApp-style reactions**.

---

## 3. AI Message Feedback

Messages sent by the AI astrologer display a **Like / Dislike toggle**.

When Dislike is selected:

```
👎 pressed
↓
Feedback chips expand
[Inaccurate] [Too Vague] [Too Long]
↓
Selecting a chip updates local state
```

The feedback chips are animated using **Reanimated layout transitions** to create a smooth expansion effect.

---

## 4. Session Termination and Rating

An **End Chat** button is available in the header.

When pressed:

```
End Chat
↓
Full screen overlay appears
↓
5-star rating component shown
↓
User selects rating
↓
Alert confirms rating submission
```

This simulates a typical **post-session feedback flow**.

---

# How Reanimated 3 Was Used

React Native Reanimated was used to create **smooth, high-performance animations**.

Key use cases:

### Swipe-to-Reply animation

A shared value tracks the horizontal translation of the message bubble.

```
translateX.value = e.translationX
```

When the gesture ends, the bubble springs back using:

```
withSpring(0)
```

Because Reanimated uses **worklets**, the animation runs on the **UI thread**, preventing frame drops and ensuring smooth interactions.

---

### Layout animations

Reanimated layout transitions were used for:

* Emoji reaction bar appearance
* AI feedback chip expansion
* UI state transitions

Example:

```
layout={LinearTransition.springify()}
```

This provides **smooth animated layout changes** without manual animation code.

---

# Gesture Handling Approach

Gestures are implemented using **React Native Gesture Handler**.

The swipe-to-reply interaction uses a **Pan gesture**:

```
Gesture.Pan()
```

Gesture flow:

```
onUpdate → track swipe distance
onEnd → check threshold
if threshold reached → trigger reply
else → reset animation
```

Important implementation detail:

* Gesture logic runs in **Reanimated worklets**
* This allows gesture updates to run on the **UI thread instead of the JS thread**

Benefits:

* No frame drops
* Smooth gesture tracking
* Responsive UI interactions

---

# State Management Choice

Redux Toolkit was used for global state management.

Redux stores the following chat state:

```
messages
replyMessage
message reactions
```

Example store structure:

```
chat
 ├── messages
 ├── replyMessage
```

Reasons for choosing Redux Toolkit:

* Predictable state management
* Centralized chat state
* Easier debugging
* Scalable architecture for larger apps

Redux also ensures message updates (reactions, replies) automatically trigger UI updates.

---

# Folder Structure

```
src
 ├── components
 │   ├── MessageBubble.tsx
 │   ├── EmojiReactionBar.tsx
 │   ├── ReplyPreview.tsx
 │   ├── AIMessageFeedback.tsx
 │   ├── RatingOverlay.tsx
 │   └── StarRating.tsx
 │
 ├── screens
 │   └── ChatScreen.tsx
 │
 ├── store
 │   ├── index.ts
 │   └── chatSlice.ts
 │
 ├── gestures
 │   └── swipeReplyGesture.ts
 │
 ├── constants
 │   ├── theme.ts
 │   └── mockMessages.ts
 │
 ├── utils
 │   └── formatTime.ts
 │
 └── types
     └── message.ts
```

This structure separates **UI components, gestures, and state management** for better maintainability.

---

# Performance Considerations

The following practices were used to maintain performance:

* Reanimated worklets for gesture logic
* UI thread animations
* FlatList virtualization for message rendering
* Redux state updates scoped to specific messages

This ensures smooth interactions even when message count grows.

---

# Demo

The demo video shows:

* Swipe-to-Reply interaction
* Long-press emoji reactions
* AI feedback chips
* End chat rating flow

---

# Conclusion

This implementation focuses on **interactive chat micro-interactions**, demonstrating:

* Gesture-driven UI
* Smooth animations
* Clean state management
* Scalable component architecture

The solution prioritizes **performance, clarity, and maintainability**, which are critical for production React Native applications.
