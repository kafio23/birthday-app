<template>
  <Page>
    <ActionBar backgroundColor="#801CEC">
      <Label class="bar-text" text="Cumpleaños" style="font-size: 25" />
    </ActionBar>

    <ScrollView>
      <GridLayout class="main-container" columns="*" rows="*" @loaded="load()">
        <!--TODO: Change from list to Month blocks-->
        <StackLayout class="list-container">
          <GridLayout
            columns="*,*"
            rows="*"
            v-for="(item, i) in listOfItems"
            :key="i"
            class="item-container"
            @itemTap="onItemTap"
          >
            <Label
              class="item-text"
              col="0"
              row="0"
              alignSelf="center"
              style="font-size: 20"
              :text="item.name"
              textWrap="true"
            />
            <Label
              class="item-text"
              col="1"
              row="0"
              alignSelf="center"
              style="font-size: 20"
              :text="
                `${item.currentBirthDayName}, ${item.birthDay} ${item.birthMonthName}`
              "
              textWrap="true"
            />
          </GridLayout>
        </StackLayout>
        <!-- <Label class="info" textWrap="true">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; " />
          <Span :text="message" />
        </FormattedString>
      </Label> -->
      </GridLayout>
    </ScrollView>
  </Page>
</template>

<script>
import SheetsService from "@/services/sheetsService";

const sheetsService = new SheetsService();
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
    }
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
