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

    mapping(address => uint) players_mapping;
    mapping(address => uint) players_Ans_mapping;
    mapping(uint => address[]) ques_player_mapping;
    mapping(address => uint) players_balance_mapping;


    modifier is_organiser(){
        require(msg.sender==organiser,"I am not an ORGANISER");
        _;
    }
    
     modifier not_organiser(){
        require(msg.sender!=organiser,"I am an ORGANISER");
        _;
    }
   
    modifier check_max_players(){
        require(maxplayer > 0,"LIMIT REACHED");
        _;
    }
    
    modifier registered(address player){
        require(players_mapping[player]==0,"You are registered");
        _;
    }

    modifier check_player_balance(uint wallet , uint prfee)
    {
        require ( wallet >= prfee, "INSUFFCIENT BALANCE");
        _;
    }
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