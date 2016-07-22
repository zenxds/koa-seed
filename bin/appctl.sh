#!/bin/bash

NODEJS_BIN=`which node`

# bin/appctl
cd `dirname $0`/..
BASE_HOME=`pwd`
PROJECT_NAME=`basename ${BASE_HOME}`
STDOUT_LOG=${BASE_HOME}/logs/nodejs_stdout.log

PROG_NAME=$0
ACTION=$1

get_pid() {
    PID=`ps ax | grep ${NODEJS_BIN} | grep -v grep | grep ${PROJECT_NAME} | awk '{print $1}'`
}

prepare() {
    for portal in 'bin/server.js' 'index.js' ; do
        if [[ -f ${BASE_HOME}/$portal ]] ; then
            PORTAL=$portal
            break
        fi
    done

    if [[ -z $PORTAL ]]; then
        echo "No portal file, make sure bin/server.js or index.js exist"
        exit 1;
    fi

    get_pid
}

usage() {
    echo "Usage: $PROG_NAME {start|stop|status|restart}"
    exit 1;
}

start(){
    prepare
    if [[ -z $PID ]]; then
        echo "Starting ${PROJECT_NAME} ..."
        nohup ${NODEJS_BIN} --harmony ${BASE_HOME}/${PORTAL} >> $STDOUT_LOG 2>&1 &
        sleep 5
        get_pid
        echo "Start nodejs success. PID=$PID"
    else
        echo "${PROJECT_NAME} is already running, PID=$PID"
    fi
}

stop(){
    prepare

    if [[ ! -z "$PID" ]]; then
        echo "Waiting ${PROJECT_NAME} stop for 5s ..."
        kill -15 $PID
        sleep 5

        mv -f $STDOUT_LOG "${STDOUT_LOG}.`date '+%Y%m%d%H%M%S'`"
    else
        echo "${PROJECT_NAME} is not running"
    fi
}
# used to check the whole app is working fine.
# if you want to just check node start up please used preload.sh
status(){
        prepare
        if [[ ! -z $PID ]]; then
            echo "PID: $PID"
            ps -ef | grep $PID
        else
            echo "${PROJECT_NAME} is not running"
        fi
}

case "$ACTION" in
    start)
        start
    ;;
    status)
        status
    ;;
    stop)
        stop
    ;;
    restart)
        stop
        start
    ;;
    *)
        usage
    ;;
esac