#!/bin/bash
npm run start:back &
BACK_PID=$!
sleep 10
npm run start:front &
FRONT_PID=$!
wait $BACK_PID $FRONT_PID