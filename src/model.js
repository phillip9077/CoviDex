import * as tf from '@tensorflow/tfjs';
import { useState, useEffect } from 'react'

const modelurl = {
    // should have updated model
    model: 'https://hbpbucket1.s3.us-east-2.amazonaws.com/model.json',
};
const testInput = tf.tensor([[[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0.19607843, 0.87843137, 0., 0., 0.,
    0., 0., 0., 0., 0.2745098,
    0.11372549, 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0.4745098, 0.90588235, 0., 0., 0.,
    0., 0., 0., 0., 0.58039216,
    0.65882353, 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.01568627,
    0.76470588, 0.90588235, 0., 0., 0.,
    0., 0., 0., 0., 0.37647059,
    0.82352941, 0.04313725, 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.27058824,
    0.98823529, 0.5254902, 0., 0., 0.,
    0., 0., 0., 0., 0.44705882,
    0.98823529, 0.08235294, 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0.17647059, 0.9254902,
    0.85098039, 0.04705882, 0., 0., 0.,
    0., 0., 0., 0., 0.75294118,
    0.98823529, 0.08235294, 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0.65882353, 0.96862745,
    0.20784314, 0., 0., 0., 0.,
    0., 0., 0., 0.07058824, 1.,
    0.99215686, 0.08235294, 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0.32941176, 0.94901961, 0.82745098,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0.55294118, 0.99215686,
    0.74117647, 0.01960784, 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0.6627451, 0.98823529, 0.41568627,
    0., 0., 0., 0., 0.,
    0., 0., 0.1254902, 0.90980392, 0.98039216,
    0.25882353, 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0.05882353, 0.88235294, 0.98823529, 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.5254902, 0.98823529, 0.82745098,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0.08627451, 0.98823529, 0.64313725, 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.6627451, 0.98823529, 0.65490196,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0.03529412, 0.8, 0.81960784, 0.07058824,
    0., 0., 0., 0., 0.,
    0., 0.08627451, 0.99215686, 0.99215686, 0.41960784,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0.6627451, 0.98823529, 0.78039216,
    0.33333333, 0.33333333, 0.33333333, 0.33333333, 0.50588235,
    0.64313725, 0.76470588, 0.98823529, 0.98823529, 0.41568627,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0.16078431, 0.66666667, 0.96078431,
    0.98823529, 0.98823529, 0.98823529, 0.98823529, 0.90980392,
    0.90588235, 0.98431373, 0.98823529, 0.98823529, 0.03529412,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.19215686,
    0.32941176, 0.32941176, 0.32941176, 0.32941176, 0.,
    0., 0.63137255, 0.98823529, 0.98823529, 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0.49803922, 0.98823529, 0.98823529, 0.17647059,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0.50196078, 0.99215686, 0.99215686, 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0.49803922, 0.98823529, 0.98823529, 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0.52941176, 0.98823529, 0.95686275, 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0.90980392, 0.9254902, 0.43529412, 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0.70196078, 0.25882353, 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.],
[0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0., 0., 0.,
    0., 0., 0.]]]);

const Predictions = (props) => {
    const [isPredicted, setIsPredicted] = useState(false);
    const [prediction, setPrediction] = useState();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    async function loadModel(url) {
        try {
            // For layered model
            const model = await tf.loadLayersModel(url);
            // For graph model
            // const model = await tf.loadGraphModel(url);
            console.log("Load model success")
            return model;
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // should be 7 day API instead
        // need to get longitude and latitude here somehow
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=' + process.env.REACT_APP_API_KEY)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )

        tf.ready().then(async () => {
            const mod = await loadModel(modelurl.model);
            setPrediction(mod.predict(testInput));
            setIsPredicted(true);
        })
        
    }, []);
    if (isLoaded) {
        // these need to be passed into mod.predict()
        const features = []
        //features.push(items.main.pressure, items.wind.speed, 15, items.main.temp_min, items.main.temp_max);
        console.log(features);
    }
    if (isPredicted && !!prediction) {
        
        return (
            <div className="prediction">
                <h1>{prediction.argMax(1).dataSync()[0]}</h1>
            </div>
        );
    }
    else {
        return (
            <div className="prediction">
                <h1>Predicting...</h1>
            </div>
        );
    }
}
export default Predictions;