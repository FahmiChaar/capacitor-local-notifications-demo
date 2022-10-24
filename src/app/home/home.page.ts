import { Component } from '@angular/core';
import { Channel, LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  async createChannel(): Promise<Channel> {
    const channelsList = await LocalNotifications.listChannels();
    channelsList.channels.forEach(async (c) => await LocalNotifications.deleteChannel(c));
    const channel: Channel = {
      id: '' + new Date().getTime(),
      name: 'Local Notifications Channel',
      importance: 5,
      visibility: 1,
      vibration: true,
    };
    await LocalNotifications.createChannel(channel);
    return channel;
  }

  async schedule() {
    const channel = await this.createChannel();
    const notifications: LocalNotificationSchema[] = [{
      title: 'Local notifications',
      body: 'Local Notifications Test app',
      id: new Date().getTime(),
      schedule: { at: new Date(), allowWhileIdle: true },
      channelId: channel.id,
    }];
    LocalNotifications.schedule({
      notifications
    });
  }

}
