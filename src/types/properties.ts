export interface Property {
    id: number
    title: string
    type: 'appartement' | 'villa' | 'magasin'
    residenceId: number
    residenceTitle?: string
    status: string
    roomsCount: number
    kitchensCount: number
    surface: number
    price: number
    imageUrl?: string
    balcony: boolean
    furnished: boolean
    published: boolean
    createdAt?: string
    updatedAt?: string
}

export interface CreatePropertyPayload {
    title: string
    type: string
    residenceId: number
    status: string
    roomsCount: number
    kitchensCount: number
    surface: number
    price: number
    imageUrl?: string
    balcony: boolean
    furnished: boolean
    published: boolean
}

export interface UpdatePropertyPayload extends CreatePropertyPayload {}
