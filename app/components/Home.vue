<template>
  <Page>
    <ActionBar>
      <Label class="bar-text" text="Cumpleaños" style="font-size: 25" />
    </ActionBar>

    <GridLayout @loaded="load()">
      <ListView for="item in listOfItems" @itemTap="onItemTap">
        <v-template>
          <GridLayout class="main-container" columns="*,*" rows="*">
            <Label
              class="item-text"
              col="0"
              row="0"
              alignSelf="center"
              style="font-size: 20"
              :text="item.name"
            />
            <Label
              class="item-text"
              col="1"
              row="0"
              alignSelf="center"
              style="font-size: 20"
              :text="item.birthday"
            />
          </GridLayout>
        </v-template>
      </ListView>
      <!-- <Label class="info" textWrap="true">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; " />
          <Span :text="message" />
        </FormattedString>
      </Label> -->
    </GridLayout>
  </Page>
</template>

<script>
import AdoService from "@/services/adoService";

const adoService = new AdoService();
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isBusy: true
    };
  },
  computed: {
    ...mapGetters({
      itemList: "itemList",
      isLoading: "isProcessing"
    }),

    listOfItems: function() {
      return this.itemList;
    },
  },
  methods: {
    ...mapActions(["loadItems"]),

    load() {
      this.loadItems("Test")
        .then(() => {
          this.isBusy = false;
        })
        .catch(error => {
          console.error(error);
          alert("An error occurred loading your Ado list.");
        });
    }
  }
};
</script>
