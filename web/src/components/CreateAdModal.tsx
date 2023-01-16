import { useState, useEffect, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import Input from "./form/Inputx";
import axios from "axios";

interface Game {
  id: string,
  title: string,
}

export default function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setVoiceChannel] = useState(false)

  useEffect(() => {
    axios("http://localhost:3333/games").then(response => {
      setGames(response.data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        "name": data.name,
        "yearsPlaying": Number(data.yearsPlaying),
        "discord": data.discord,
        "weekDays": weekDays.map(Number),
        "hourStart": data.hourStart,
        "hourEnd": data.hourEnd,
        "useVoiceChannel": useVoiceChannel
      })
      alert("Anúncio criado com sucesso!")
    } catch (error) {
      alert("Erro ao criar o anúncio!")
      console.log(error)
    }

  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publique um Anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
            <select
              id='game'
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
              defaultValue=""
            >
              <option disabled value="">Selecione o game que deseja jogar</option>
              {games.map(game => {
                return (
                  <option value={game.id} key={game.id}>{game.title}</option>
                )
              })}
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input type="text" name="name" id='name' placeholder='Como te chamam dentro do game?' />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input type="number" name="yearsPlaying" id="yearsPlaying" placeholder='Tudo bem ser zero' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual seu discord?</label>
              <Input type="text" name="discord" id='discord' placeholder='Usuario#0000' />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="1"
                  title='Domingo'
                  className={`w-8 h-8 rounded  ${weekDays.includes('1') ?
                    'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title='Segunda'
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ?
                    'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title='Terça'
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ?
                    'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title='Quarta'
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ?
                    'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title='Quinta'
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ?
                    'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title='Sexta'
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ?
                    'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="7"
                  title='Sábado'
                  className={`w-8 h-8 rounded ${weekDays.includes('7') ?
                    'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input type="time" name="hourStart" id="hourStart" placeholder='De' />
                <Input type="time" name="hourEnd" id="hourEnd" placeholder='De' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex items-center gap-2 text-sm hover:cursor-pointer'>
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setVoiceChannel(true)
                } else {
                  setVoiceChannel(false)
                }
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>

              {/* <Input type="checkbox" name="" id="" /> */}
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors'
            >
              Cancelar
            </Dialog.Close>
            <button className='bg-violet-500 px-5 h-12  font-semibold rounded-md flex items-center gap-3 hover:bg-violet-600 transition-colors' type="submit">
              <GameController size={24} />
              Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}