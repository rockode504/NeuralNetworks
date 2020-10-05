Webcam.set
({
   width:350,
   height:260,
   image_format: 'png',
   flip_horiz: true,
   png_quality: 1000
});

camera=document.getElementById("camera"); 

Webcam.attach('#camera');

function takeShot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("output").innerHTML='<img id="capturedImage" src="'+data_uri+'"/>';
    });
}


console.log('ml5 version', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0XrxnAvWk/model.json', modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!")
}

function checkShot()
{
    img=document.getElementById("capturedImage");
    classifier.classify(img, gotResult);

}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("objectName").innerHTML=results[0].label;
        document.getElementById("objectAccuracy").innerHTML=results[0].confidence.toFixed(3);
    }
}

