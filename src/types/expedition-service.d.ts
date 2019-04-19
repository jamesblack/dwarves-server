interface Expedition {
  rations: number
  dwarves: Dwarf[]
}

interface Dwarf {
  name: string
  isDead: boolean
}

interface ExpeditionService {
  getRations: () => Promise<number>
  getDwarves: () => Promise<Dwarf[]>
  consumeDailyRations: () => Promise<Expedition>
}
