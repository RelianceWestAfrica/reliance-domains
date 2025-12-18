export interface Floor {
    id: number
    title: string
    description?: string
    residenceId: number
    residenceTitle?: string
    unitCount: number
    availableUnits: number
    createdAt?: string
    updatedAt?: string
}

export interface CreateFloorPayload {
    title: string
    description?: string
    residenceId: number
}

export interface UpdateFloorPayload extends CreateFloorPayload {}
