<template>
    <vue-apex-charts type="pie" width="380" :options="chartOptions" :series="series"></vue-apex-charts>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'
    import locate from './translate'

    export default {
        name: "OrderByStatus",
        props: ['statusSeries', 'statusLabels'],
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
                        width: 380,
                        type: 'pie',
                    },
                    labels: [],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
            }
        },
        watch: {
            statusSeries(newValue) {
                this.series = newValue
            },
            statusLabels(newValue) {
                this.chartOptions = {...this.chartOptions, ...{
                        labels: newValue
                    }
                };
            }
        }
    }
</script>

