<template>
    <vue-apex-charts type="line" height="350" :options="chartOptions" :series="series"></vue-apex-charts>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'
    import locate from './translate'

    export default {
        name: "OrdersByDay",
        props: ['daySeries', 'dayCategories'],
        components: {
            VueApexCharts
        },
        data () {
            return {
                series: [],
                chartOptions: {
                    chart: {
                        defaultLocale: locate.default,
                        locales:locate.translate,
                        height: 350,
                        type: 'line',
                    },
                    stroke: {
                        width: 7,
                        curve: 'smooth'
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: [],
                    },
                    title: {
                        align: 'left',
                        style: {
                            fontSize: "16px",
                            color: '#666'
                        }
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            gradientToColors: [ '#FDD835'],
                            shadeIntensity: 1,
                            type: 'horizontal',
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 100, 100, 100]
                        },
                    },
                    markers: {
                        size: 4,
                        colors: ["#FFA41B"],
                        strokeColors: "#fff",
                        strokeWidth: 2,
                        hover: {
                            size: 7,
                        }
                    },
                    yaxis: {
                        min: -10,
                        max: 40,
                        title: {
                            text: 'Pedidos',
                        }
                    }
                },
            }
        },
        watch: {
            daySeries(newValue) {
                this.series = [{
                    name: 'Pedidos',
                    data: newValue
                }];
            },
            dayCategories(newValue) {
                this.chartOptions = {...this.chartOptions, ...{
                    xaxis: {
                        type: 'datetime',
                        categories: newValue,
                    }
                }};
            }
        }
    }
</script>

