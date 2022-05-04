<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="text-3xl font-medium text-900 mb-3">My lego collection</div>
    <div class="font-medium text-500 mb-3">Some additional text.</div>
    <div v-if="results&&!results.length" style="min-height: 150px" class="border-2 border-dashed surface-border">
    </div>
    <DataTable v-if="results&&results.length" :value="results" responsiveLayout="scroll">
      <template #header>
        <div class="table-header">
          Results
          <Button icon="pi pi-refresh" />
        </div>
      </template>
      <Column field="set_Number" header="Set num."></Column>
      <Column field="name" header="Name"></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img :src=slotProps.data.image :alt=slotProps.data.image class="product-image" />
        </template>
      </Column>
      <Column field="year" header="Year"></Column>
      <!--<Column field="amount" header="Amount you have"></Column>-->
      <Column field="number_Parts" header="Num. of parts"></Column>
      <template #footer>
        In total there are {{results ? results.length : 0 }} results.
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ref } from "vue";
import { CollectionStore } from '@/stores/collectionStore';
const collectionStore=CollectionStore();
const results=ref();
collectionStore.getCollection().then(collection=>{ 
  results.value=collection
});
</script>


<style scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
</style>