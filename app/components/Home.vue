<template>
  <Page>
    <ActionBar backgroundColor="#801CEC">
      <Label class="bar-text" text="Cumpleaños" style="font-size: 25" />
    </ActionBar>

    <ScrollView>
      <GridLayout class="main-container" columns="*" rows="*" @loaded="load()">
        <ActivityIndicator
          :visibility="isBusy ? 'visible' : 'collapsed'"
          :busy="isBusy ? 'true' : 'false'"
        />
        <StackLayout
          :visibility="isBusy ? 'collapsed' : 'visible'"
          class="list-container"
        >
          <StackLayout
            v-for="(month, i) in monthsList"
            :key="i"
            class="item-container"
            @itemTap="onItemTap"
          >
            <Label
              class="item-title"
              alignSelf="center"
              style="font-size: 20"
              :text="month"
              textWrap="true"
              marginBottom="5"
            />
            <FlexboxLayout
              v-for="(item, j) in listOfItems"
              :key="j"
              @itemTap="onItemTap"
              :visibility="(item.birthMonth-1) == i ? 'visible' : 'collapsed'"
            >
              <Label
                class="item-text"
                alignSelf="center"
                style="font-size: 20"
                :text="item.name"
                textWrap="true"
                width="40%"
              />
              <Label
                class="item-text"
                alignSelf="center"
                style="font-size: 20"
                :text="
                  ` ${item.currentBirthDayName}, ${item.birthDay}`
                "
                textWrap="true"
                width="60%"
              />
            </FlexboxLayout>
          </StackLayout>
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
import { constants } from "@/constants";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

const sheetsService = new SheetsService();
const months = constants.MONTHS;

export default {
  data() {
    return {
      isBusy: true,
      monthsList: months
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
          alert("An error occurred loading items list.");
        });
    }
  }
};
</script>
