import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")


form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value
  
  if(!videoURL.includes("shorts")){
    return content.textContent = "Esse vídeo não é um YouTube Short. Selecione um vídeo da seção Shorts no YouTube."
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Obtendo a transcrição do áudio..."
  
  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Resumindo o conteúdo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
  
})