import React , { useState }  from 'react'
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import {useSelector} from 'react-redux';
import AnswerHelper from '../helpers/AnswerHelper';
import Map from './Map';
import {Menu,Icon} from 'semantic-ui-react'

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
                //document.getElementById("text").textContent = "hello";
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
            <Menu secondary pointing> 
                <Menu.Item> 
                    <div><Icon  size='massive' onClick={() => interact()} name="microphone"></Icon></div>
                </Menu.Item>
            </Menu>
        </div>
    )
}
export default SpeechInteraction;