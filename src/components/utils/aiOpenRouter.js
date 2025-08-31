  
  export const getAIMoveFromOpenRouter =async(board)=>{

    console.log(import.meta.VITE_OPENROUTER_API_KEY)
 
    const systemPrompt = `
        you are a smart Tic Tac Toe AI playing as "O".

        your goal:
        1.Win if possible
        2.Block the opponent if they are about to win
        3.otherwise:choose center > corner > side

        only return ONE number (0-8). Do not explain.`

    const userPrompt=`
    Current board:${JSON.stringify(board)}

    Each cell is indexed like this:
    [0][1][2]
    [3][4][5]
    [6][7][8]

    "O" = you(AI)
    "X" =human
    null=empty


    What is Your move?
    `
    
    const getMoveFromClaude = async ()=>{

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{
            method:"POST",
            headers:{
                Authorization:`Bearer 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`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                // model:"deepseek/deepseek-r1",
                model:"deepseek-v3-base:free",
                temperature:0.2,
                messages:
                [
                    {role:"system", content:systemPrompt},
                    {role:"user" , content:userPrompt},
                ]
            })
        });
        console.log(response);

        const data = await response.json();

        console.log(data);

        const text = data.choices?.[0]?.message?.content?.trim();

        console.log(text);

        const match = text.match(/\d+/);

        return match ? parseInt(match[0],10) : null ; 
    }

        try{
            let move= await getMoveFromClaude();
            return move;
        }catch(err){
            console.log("AI",err)

            const preferredorder = [4,0,2,6,8,1,3,5,7];

            return preferredorder.find(i=>board[i] === null ?? null)
        }
    }
      