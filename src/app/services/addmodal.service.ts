import { Injectable } from '@angular/core';
import { computed, inject, signal } from '@angular/core';

interface State {
    value: boolean,
}

@Injectable({
    providedIn: 'root'
})
export class AddModalService {

    #state = signal<State>({
        value: false,
    });

    public value = computed( () => this.#state().value );

    constructor() {
        this.#state.set({
            value: false
        });
    }

    open(): void {
        this.#state.set({
            value: true
        });
    }

    close(): void {
        this.#state.set({
            value: false
        });
    }

}