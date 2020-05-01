##### Table of Contents  
+ [Introduction](#introduction) 
+ [Prerequisite](#prerequisite) 
+ [Getting the code](#getting_the_code)
+ [How To Run](#how_to_run)

<a name="introduction"/>

## Introduction
+ This is the command line iterface of fortiate for fortiate
> Fortiate CLI can be accessed via following techniques
- [x] **Terminal** (standalone terminal application)
- [] **API** (Application Program Interface)
- [] **Event** (Pub-Sub Model)

<a name="prerequiste"/> 

## Prerequisite

* Git  **> 2.24.1**
* NodeJS **> 10.15.0**
* NPM (node package manager) **> 6.8.0**

> setting up environmental variables   
```
export FORTIATE_HOME=~/path/to/folder/build
export FORTIATE_HOST=http(s)://domain
```
Examples:
FORTIATE_HOME=/roots/projects
FORTIATE_HOME=/Users/amodkulkarni/Projects/FORTIATE
FORTIATE_HOST=https://dev.fortiate.com
FORTIATE_HOST=http://localhost

note : Fortiate's HOME is the place where build and deploy reside


<a name="getting_the_code"/>

## Getting the Code

> directly from git repo
```
npm install git+ssh://git@github.com/fortiate/fortiate-cli.git
```


<a name="how_to_run"/>

## How to run

> anywhere type
```
fortiate
```

note : you create aliases aka short cuts commands in your rc file(bashrc,zshrc) 
```
alias fd=fortiate deploy
alias fl=fortiate log
alias fk=fortiate kafka
alias flp=fortiate log preprocessor
alias fdc=fortiate deploy clean
alias fduc=fortiate deploy update cleaner
```

please note : if you find an interesting alias do note it here above for others to follow suit
