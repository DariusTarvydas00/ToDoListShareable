<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="text-3xl font-medium text-900 mb-3">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText type="text" v-model="value1" v-on:change="change" placeholder="Search for lego piece to add" />
      </span>
    </div>
    <DataTable :value="results" responsiveLayout="scroll">
      <template #header>
        <div class="table-header">
          Results
          <Button icon="pi pi-refresh" />
        </div>
      </template>
      <Column field="set_num" header="Set num."></Column>
      <Column field="name" header="Name"></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img :src=slotProps.data.set_img_url :alt=slotProps.data.set_img_url class="product-image" />
        </template>
      </Column>
      <Column field="year" header="Year"></Column>
      <Column field="num_parts" header="Num. of parts"></Column>
      <Column header="Select">
        <template #body="slotProps">
          <Button v-on:click="select(slotProps.data.set_num)">Add to collection</Button>
        </template>
      </Column>
      <template #footer>
        In total there are {{results ? results.length : 0 }} results.
      </template>
    </DataTable>
  </div>
</template>

<script setup type="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { RebrickableService } from "@/services/rebrickable.service"
import { ref } from "vue";
import { CollectionStore } from "@/stores/collectionStore";
const rebrickableService=new RebrickableService();
const collectionStore = CollectionStore();

const value1=ref("");

const results=ref([]);

function select(set_num){
  let res=results.value.filter(obj=>obj.set_num==set_num)[0];
  collectionStore.addToCollection({image:res.set_img_url,name:res.name,year:res.year,number_Parts:res.num_parts,set_Number:res.set_num,amount:1});
}

function change(){
  console.log(rebrickableService.searchSets(value1.value).then(r=>{
    results.value=r.results;
  }));
}
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