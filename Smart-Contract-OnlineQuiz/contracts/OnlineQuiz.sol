pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;
contract OnlineQuiz {
    
    struct Question{
        string QUES;
        string ANS;
        uint count;
    }
    
    string[] v_question;
    Question[] questions;
    
    uint maxplayer;
    uint pfee;
    uint tfee;
    address organiser;
    uint org_fee;
    
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
        require(msg.sender==organiser,"I AM NOT AN ORGANISER");
        _;
    }
    
     modifier not_organiser(){
        require(msg.sender!=organiser,"I AM AN ORGANISER");
        _;
    }
   
    modifier check_max_players(){
        require(maxplayer > 0,"LIMIT REACHED");
        _;
    }
    
    modifier registered(address player){
        require(players_mapping[player]==1,"YOU ARE NOT REGISTERD");
        _;
    }

    modifier check_player_balance(uint wallet , uint prfee)
    {
        require ( wallet >= prfee, "INSUFFCIENT BALANCE");
        _;
    }
     
    modifier is_question_no()
    {
        require ( noques > till_noques, "MAXIMUM QUES REACHED");
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
    
    function addQuestion(string ques, string ans)
    public is_organiser()
    is_question_no()
    {
        
        till_noques +=1;
        questions.push(Question({
            QUES: ques,
            ANS: ans,
            count: 0
        }));

        v_question.push(ques);
    }
    
    
    function registerParticipants(uint wallet) public payable
    not_organiser()
    check_player_balance(wallet, pfee)
    check_max_players()
    {
        tfee += pfee;
        
        players_mapping[msg.sender] = 1;
        players_balance_mapping[msg.sender] = wallet - pfee;
        //calculateCorrectAnswer(_answer1,_answer2,_answer3,_answer4);
        maxplayer -= 1;
        players.push(msg.sender);
    }
    
    function compare_answers (string given, string answered)
    public returns (bool)
    {
        bytes memory given1 = bytes(given);
        bytes memory answered1 = bytes(answered);
        return keccak256(given1) == keccak256(answered1);
    }
    
    function view_question() public view returns (string[] ques) 
    {
        return (v_question);
    }
    
    function play(string[] answers) public 
    registered(msg.sender)
    {
        //uint correct_ans = 0;
        for (uint i = 0; i< questions.length; i++)
        {
            if(compare_answers(questions[i].ANS, answers[i]))
            {
                
                questions[i].count += 1;
                ques_player_mapping[i].push(msg.sender);
                //players_Ans_mapping[msg.sender] = i;
                //correct_ans ++ ;
            }
        }
        //players_Ans_mapping[msg.sender] = correct_ans;
        
    }
    
    function Payto_winner() public
    is_organiser()
    {

        uint pay;
        uint temp_fee = tfee;
        for(uint i = 0;i < questions.length;i++){
           
           for(uint j = 0;j< ques_player_mapping[i].length;j++)
           {
               
            pay = ((3*tfee)/16)/ques_player_mapping[i].length;
            players_balance_mapping[ques_player_mapping[i][j]] += pay; 
            
            temp_fee -= pay; 
           }
           
        }
       org_fee = temp_fee;
    }
    
    
    function viewbalance_player() public 
    not_organiser() view returns (address participant, uint balance) 
    {
        
        return (msg.sender , players_balance_mapping[msg.sender]);
    }
    
    function viewbalance_org() public 
    is_organiser() view returns (uint) 
    {
        return org_fee;
    }
    
    function take_money_org() public
    is_organiser()
    {
        msg.sender.transfer(org_fee);
        org_fee = 0;
    }
    
    function take_money_player() public 
    not_organiser()
    {
        msg.sender.transfer(players_balance_mapping[msg.sender]);
        players_balance_mapping[msg.sender] = 0;
    }
}
