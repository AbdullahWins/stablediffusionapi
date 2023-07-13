const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// stable

app.post("/stable", (req, res) => {
  console.log(req?.body); // Log the request body to debug

  const preDefinedData = {
    key: process.env.STABLE_DIFFUSION_API_KEY,
    model_id: "cartoonish",
    prompt:
      "actual 8K full body image of a japanese naked teenage girl, with big boobs, detailed face, detailed boobs, detailed belly, detailed legs, happy colors, bright eyes, clear eyes, warm smile, smooth soft  skin, big dreamy eyes, beautiful intricate colored hair, symmetrical, anime wide eyes, soft lighting, detailed face, by makoto   shinkai, stanley artgerm lau, wlop, rossdraws, concept art, digital painting, realistic face, realistic boobs, realistic belly, realistic legs, realistic full body, teen girl looking into camera",
    negative_prompt:
      "painting, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, deformed, ugly, blurry, bad  anatomy, bad proportions, extra limbs, cloned face, skinny, glitchy, double torso, extra arms, extra hands, mangled fingers,   missing lips, ugly face, distorted face, extra legs, anime",
    width: "512",
    height: "512",
    samples: "1",
    num_inference_steps: "30",
    safety_checker: "no",
    enhance_prompt: "yes",
    seed: null,
    guidance_scale: 7.5,
    multi_lingual: "no",
    panorama: "no",
    self_attention: "no",
    upscale: "no",
    embeddings_model: null,
    lora_model: null,
    tomesd: "yes",
    use_karras_sigmas: "yes",
    vae: null,
    lora_strength: null,
    scheduler: "UniPCMultistepScheduler",
    webhook: null,
    track_id: null,
  };

  const options = {
    method: "POST",
    url: "https://stablediffusionapi.com/api/v4/dreambooth",
    headers: {
      "Content-Type": "application/json",
    },
    data: preDefinedData,
  };

  axios(options)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Error occurred during the stable API request");
    });
});

// server start

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
