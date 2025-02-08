package dev.user_service.rabbitmq.user;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitmqUserConf {

    private static final String QUEUE_NAME = "user_queue";
    private static final String EXCHANGE_NAME = "amp.topic";
    private static final String ROUTING_KEY = "KK.EVENT.CLIENT.*.*.*.*";

    // @Bean
    // public Queue queue() {
    // return new Queue(QUEUE_NAME, true);
    // }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    // @Bean
    // public Binding binding(Queue userQueue, TopicExchange topicExchange) {
    // return BindingBuilder.bind(userQueue).to(topicExchange).with(ROUTING_KEY);
    // }

    @Bean
    public UserMessageReceiver receiver() {
        return new UserMessageReceiver();
    }

    @Bean
    public UserMessageSender sender() {
        return new UserMessageSender();
    }

    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
