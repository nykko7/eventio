import { BecomeProModalComponent } from "@/modals/components/BecomeProModal"

export enum GlobalModal {
  becomePro = "becomePro",
}

export const globalModals = {
  [GlobalModal.becomePro]: BecomeProModalComponent,
}

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof globalModals
  }
}
