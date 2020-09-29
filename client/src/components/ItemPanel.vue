<template>
  <v-expansion-panels
      v-model="panel"
      multiple
      :focusable="$vuetify.breakpoint.smAndDown"
    >
      <v-expansion-panel
        v-for="(folder, i) in vaultData"
        :key="folder.id"
        :readonly="$vuetify.breakpoint.smAndDown"
      >
        <v-expansion-panel-header>
           <div>
                <v-icon class="mr-10">mdi-folder-outline</v-icon>
                  {{folder.folder_name}}
              <v-chip
                text-color="white"
                color="#00a8f3"
                small
                class="ml-3"
                text="5"
              >
                <b>{{counts[i]}}</b>
              </v-chip>
            </div>
           <template v-slot:actions>
              <v-icon v-show="$vuetify.breakpoint.mdAndUp">$expand</v-icon>
            </template>
        </v-expansion-panel-header>
        <!-- passwords -->
        <v-expansion-panel-content
          v-for="password in folder.Passwords"
          :key="password.id"
          :class="{'mobilepad': $vuetify.breakpoint.smAndDown}"
        >
          <mobileMenu v-bind:password="password" :type="'passwords'" :folderIndex="i" v-if="$vuetify.breakpoint.smAndDown"></mobileMenu>
          <v-toolbar v-else>
            <v-col cols="1">
            <v-icon :small="$vuetify.breakpoint.smAndDown" class="pl-0">mdi-lock</v-icon>
            </v-col>
            <v-col cols="md-5 col-lg-7">
              <v-toolbar-title>
                <v-list class="pa-0">
                  <v-list-item-title>{{password.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{password.userName}}</v-list-item-subtitle>
                </v-list>
              </v-toolbar-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <Options v-bind:item="password" :type="'passwords'" :folderIndex="i"></Options>
            </v-toolbar-items>
            <!-- <v-spacer></v-spacer> -->
                              <!-- <v-toolbar-items>
                                <v-list-item :href="password.url" target="_blank" @click="!sheets">
                                  <v-list-item-avatar>
                                    <v-tooltip
                                      bottom
                                    >
                                      <template v-slot:activator="{on, attrs}">
                                        <v-icon
                                          v-bind="attrs"
                                          v-on="on"
                                        >
                                          mdi-rocket-launch
                                        </v-icon>
                                      </template>
                                      <span>Launch</span>
                                    </v-tooltip>
                                  </v-list-item-avatar>
                                </v-list-item>
                                <v-list-item @click="copyUsername(password.userName)">
                                  <v-list-item-avatar>
                                    <v-tooltip
                                      bottom
                                    >
                                      <template v-slot:activator="{on, attrs}">
                                        <v-icon
                                          v-bind="attrs"
                                          v-on="on"
                                        >
                                          mdi-content-copy
                                        </v-icon>
                                      </template>
                                      <span>Copy Username</span>
                                    </v-tooltip>
                                  </v-list-item-avatar>
                                </v-list-item>
                                <v-list-item @click="copyPassword(password.id)">
                                  <v-list-item-avatar>
                                    <v-tooltip
                                      bottom
                                    >
                                      <template v-slot:activator="{on, attrs}">
                                        <v-icon
                                          v-bind="attrs"
                                          v-on="on"
                                        >
                                          mdi-content-copy
                                        </v-icon>
                                      </template>
                                      <span>Copy Password</span>
                                    </v-tooltip>
                                  </v-list-item-avatar>
                                </v-list-item>
                                <v-list-item @click="x">
                                  <v-list-item-avatar>
                                    <v-tooltip
                                      bottom
                                    >
                                      <template v-slot:activator="{on, attrs}">
                                        <v-icon
                                          v-bind="attrs"
                                          v-on="on"
                                        >
                                          mdi-pencil
                                        </v-icon>
                                      </template>
                                      <span>Edit</span>
                                    </v-tooltip>
                                  </v-list-item-avatar>
                                </v-list-item>
                              </v-toolbar-items> -->
          </v-toolbar>
          <!-- <div v-else>Else part</div> -->
        </v-expansion-panel-content>
        <v-expansion-panel-content
          v-for="note in folder.Notes"
          :key="note.id"
          :class="{'mobilepad': $vuetify.breakpoint.smAndDown}"
        >
          <mobileMenu :type="'notes'" :note="note" :folderIndex="i" v-if="$vuetify.breakpoint.smAndDown"></mobileMenu>
          <v-toolbar v-else>
            <v-col cols="1">
            <v-icon :small="$vuetify.breakpoint.smAndDown" class="pl-0">mdi-note</v-icon>
            </v-col>
            <v-col cols="sm10 md8 lg5">
              <v-toolbar-title>
                <v-list class="pa-0">
                  <v-list-item-title>{{note.name}}</v-list-item-title>
                  <!-- <v-list-item-subtitle>{{password.userName}}</v-list-item-subtitle> -->
                </v-list>
              </v-toolbar-title>
            </v-col>
            <v-toolbar-items>
              <Options :type="'notes'" :item="note" :folderIndex="i"></Options>
            </v-toolbar-items>
          </v-toolbar>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import mobileMenu from '@/components/mobileMenu'
import Options from '@/components/Options'
export default {
  data () {
    return {
      focusable: true
    }
  },
  methods: {
  },
  computed: {
    vaultData () {
      return this.$store.state.vaultData
    },
    counts () {
      var count = []
      this.vaultData.forEach((folder, i) => {
        count[i] = folder.Passwords.length + folder.Notes.length || '0'
      })
      return count
    },
    panel: {
      set () {
        return this.$vuetify.breakpoint.smAndDown ? this.$store.state.panel : true
      },
      get () {
        return this.$vuetify.breakpoint.smAndDown ? this.$store.state.panel : true
      }
    }
  },
  components: {
    mobileMenu,
    Options
  }
}
</script>

<style>
  .mobilepad > .v-expansion-panel-content__wrap {
    padding-right: 0;
    padding-left: 0;
  }
  .v-toolbar__content {
    padding: 0
  }
</style>
