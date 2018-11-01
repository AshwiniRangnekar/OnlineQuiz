pragma solidity ^0.4.22;

contract OnlineQuiz{
	struct Question{
        string QUES;
        string ANS;
        uint count;
    }
    
    Question[] questions;
    
    uint maxplayer;
    uint pfee;
    uint tfee;
    address organiser;
    
    uint noques;
    uint till_noques;
    
    uint time;
    //uint[] countarray;
    
    address[] players;
    constructor(uint fee, uint n, uint noq) 
    public
    {
         
        organiser = msg.sender;
        pfee = fee;
        tfee = 0;
        maxplayer = n;
        time = now;
        noques = noq;
        till_noques = 0;
    }
}