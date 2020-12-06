import React , { useState }  from 'react'
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import {useSelector} from 'react-redux';
import AnswerHelper from '../helpers/AnswerHelper';

const SpeechInteraction = () => {
    const [value, setValue] = useState('');
    const { speak } = useSpeechSynthesis();
    
    const user = useSelector(state => state.user.user)
    let hear = "";
    const { listen, stop, listening } = useSpeechRecognition({
        onResult: (result) => {
            hear = result;
        }
    });

    const interact = () => {
        listen();
        setTimeout(() => {
            getAnswer(hear)
            .then(resp => resp.json())
            .then(data => {
                if(data.length > 0) {
                    speakAnswers(data[0].answer);    
                } else {
                    const answer = AnswerHelper(hear, user);
                    if(answer){
                        speakAnswers(answer);
                    } else {
                        speakAnswers("Sorry I did not understand you");
                    } 
                }
                stop();
            })
        }, 3000);        
    }
    
    const getAnswer = async (question) => {
        return await fetch(`http://localhost:3000/api/v1/question_answers?askedQ=${question}`);
    }
    
    const speakAnswers = async (answer) => {
        speak({ text: answer });
    }

    return (
        <div>   
            <button onClick={() => interact()}>Start</button>
        </div>
    )
}
export default SpeechInteraction;