import type { Lego } from "@/models/Lego";
import { defineStore } from "pinia";
import { CollectionService } from "../services/collection.service";

const collectionService: CollectionService = new CollectionService();

export const CollectionStore = defineStore({
  id: "collectionStore",
  state: () => ({
    collection:[],
  }),
  getters: {
    collection: (state) => {
      if (state.collection.length) return state.collection;
      else return undefined;
    },
  },
  actions: {
    getCollection(){
      return new Promise((resolve, reject) => {
        collectionService
            .getCollection()
            .then((collection) => {
              resolve(collection);
            })
            .catch((err) => {
              reject(err);
            });
      });
    },
    addToCollection(lego: Lego){
      return new Promise((resolve, reject) => {
        collectionService
            .addToCollection(lego)
            .then((collection) => {
              resolve(collection);
            })
            .catch((err) => {
              reject(err);
            });
      });
    },
  },
});